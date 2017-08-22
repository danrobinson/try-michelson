import { createSelector } from 'reselect'
import { parse, stringify } from 'query-string'

const EDIT   = 'try-michelson/editing/EDIT';
const SET_RESULT = 'try-michelson/editing/SET_RESULT';
const SHARE = 'try-michelson/editing/SHARE';

export const typecheck = () => {
  return (dispatch, getState) => {
    const state = getState()
    const source = getSource(state)
    fetch('https://try-michelson.com/typecheck', {
      method: 'post',
      body: JSON.stringify({ program: source })
    }).then((result) => {
      return result.text()
    }).then((result) => {
      dispatch({
        type: SET_RESULT,
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
  result: "",
  select: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT: {
      return {
        ...state,
        source: action.source,
        result: "",
        select: false
      }
    }
    case SET_RESULT: {
      return {
        ...state,
        result: action.result,
        select: false
      }
    }
    case SHARE: {
      return {
        ...state,
        result: "https://try-michelson.com/?" + stringify({ source: state.source }),
        select: true
      }
    }
    case "@@router/LOCATION_CHANGE":
      const parameters = parse(action.payload.search)
      return {
        ...state,
        source: parameters.source || state.source,
        result: "",
        select: false
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

export const getSelect = createSelector(
  getEditing,
  state => state.select  
)

export const edit = (source) => ({
  type: EDIT,
  source
})

export const share = () => ({
  type: SHARE
})