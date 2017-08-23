import { createSelector } from 'reselect'
import { parse, stringify } from 'query-string'

const EDIT   = 'try-michelson/editing/EDIT';
const TYPECHECK = 'try-michelson/editing/TYPECHECK';
const SHARE = 'try-michelson/editing/SHARE';

export const typecheck = () => {
  return (dispatch, getState) => {
    const state = getState()
    const source = getSource(state)
    fetch('https://api.try-michelson.com/typecheck', {
      method: 'post',
      body: JSON.stringify({ program: source })
    }).then((result) => {
      return result.text()
    }).then((result) => {
      dispatch({
        type: TYPECHECK,
        result: result
      })
    })
  }
}

const firstExample = `parameter unit;
return unit;
storage tez;
code {CDR; DUP;
      AMOUNT; CMPLT;
      IF {FAIL} {UNIT; PAIR}}
`

const initialState = {
  source: firstExample,
  result: {
    loading: false,
    result: ""
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT: {
      return {
        ...state,
        source: action.source
      }
    }
    case TYPECHECK: {
      return {
        ...state,
        result: action.result
      }
    }
    case SHARE: {
      return {
        ...state
      }
    }
    case "@@router/LOCATION_CHANGE":
      const parameters = parse(action.payload.search)
      return {
        ...state,
        source: parameters.source || state.source,
        result: ""
      }
    default: return state
  }
}

export const getEditing =
  state => state.editing

export const getSource = createSelector(
  getEditing,
  state => state.source  
)

export const getResult = createSelector(
  getEditing,
  state => state.result  
)

export const edit = (source) => {
  return (dispatch) => {
    dispatch({
      type: EDIT,
      source
    })
    dispatch(typecheck())
  }
}

export const share = () => ({
  type: SHARE
})

export const getShareURL = createSelector(
  getSource,
  source => "https://try-michelson.com/?" + stringify({ source })
)

export const getSelectedTab = createSelector(
  getEditing,
  state => state.selectedTab
)