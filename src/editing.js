const EDIT   = 'try-michelson/editing/EDIT';
const TYPECHECK = 'try-michelson/editing/TYPECHECK';

export const typecheck = () => {
  return (dispatch, getState) => {
    const state = getState()
    const source = getSource(state)
    fetch('http://try-michelson.com/typecheck', {
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

export default function reducer(state, action) {
  switch (action.type) {
    case EDIT: {
      return {
        ...state,
        source: action.source,
        result: ""
      }
    }
    case TYPECHECK: {
      return {
        ...state,
        result: action.result
      }
    }
    default: return state
  }
}

export const getSource = 
state => state.source

export const getResult = 
  state => state.result

export const edit = (source) => ({
  type: EDIT,
  source
})
