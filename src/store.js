import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './editing'


const enhancers = []
const middleware = [
  thunk
]

const firstExample = `parameter unit;
return unit;
storage tez;                    
code {CDR; DUP;                 
      AMOUNT; CMPLT;            
      IF {FAIL} {UNIT; PAIR}}   
`

const initialState = {
  source: firstExample,
  result: ""
}

const devToolsExtension = window.devToolsExtension

if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension())
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  reducer,
  initialState,
  composedEnhancers
)

export default store
