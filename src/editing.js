import { createSelector } from 'reselect'
import { parse, stringify } from 'query-string'

const EDIT   = 'try-michelson/editing/EDIT'
const TYPECHECK = 'try-michelson/editing/TYPECHECK'
const SHARE = 'try-michelson/editing/SHARE'
const RUN = 'try-michelson/editing/RUN'
const SET_INPUT_FIELD = 'try-michelson/editing/SET_INPUT_FIELD'
const SELECT_TAB = 'michelson/editing/SELECT_TAB'

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

const firstExample = `parameter string;
storage string;
return string;
code {DUP;
      CAR;
      DIP{CDR;
          DUP};
      SWAP;
      CONCAT;
      PAIR}
`

const initialState = {
  source: firstExample,
  result: "",
  typecheckResult: "",
  parameter: "",
  storage: "",
  selectedTab: 1
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT: {
      return {
        ...state,
        source: action.source,
        runResult: ""
      }
    }
    case TYPECHECK: {
      return {
        ...state,
        typecheckResult: action.result
      }
    }
    case RUN: {
      return {
        ...state,
        runResult: action.result
      }
    }
    case SHARE: {
      return {
        ...state
      }
    }
    case SET_INPUT_FIELD: {
      return {
        ...state,
        [action.field]: action.val,
        runResult: ""
      }
    }
    case SELECT_TAB: {
      return {
        ...state,
        selectedTab: action.index
      }
    }
    case "@@router/LOCATION_CHANGE":
      const parameters = parse(action.payload.search)
      return {
        ...state,
        source: parameters.source || state.source,
        runResult: "",
        typecheckResult: ""
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

export const getTypecheckResult = createSelector(
  getEditing,
  state => state.typecheckResult  
)

export const getRunResult = createSelector(
  getEditing,
  state => state.runResult  
)

export const getParameter = createSelector(
  getEditing,
  state => state.parameter
)

export const getStorage = createSelector(
  getEditing,
  state => state.storage
)

export const setInputField = (field, val) => {
  return {
    type: SET_INPUT_FIELD,
    field: field,
    val: val
  }
}

export const edit = (source) => {
  return (dispatch, getState) => {
    dispatch({
      type: EDIT,
      source
    })
    let selectedTab = getSelectedTab(getState())
    if (selectedTab === 2) {
      dispatch(typecheck())
    }
  }
}

export const share = () => ({
  type: SHARE
})

export const run = () => {
  return (dispatch, getState) => {
    const state = getState()
    const source = getSource(state)
    const storage = getStorage(state)
    const parameter = getParameter(state)
    fetch('https://api.try-michelson.com/run', {
      method: 'post',
      body: JSON.stringify({ program: source, storage: storage, parameter: parameter })
    }).then((result) => {
      return result.text()
    }).then((result) => {
      dispatch({
        type: RUN,
        result: result
      })
    })
  }
}

export const selectTab = (index) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_TAB,
      index
    })
    if (index === 2) {
      dispatch(typecheck())
    }
  }
}

export const getShareURL = createSelector(
  getSource,
  source => "https://try-michelson.com/?" + stringify({ source })
)

export const getSelectedTab = createSelector(
  getEditing,
  state => state.selectedTab
)
