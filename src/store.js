import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import reducer from './editing'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { typecheck } from './editing'

export const history = createHistory()

const initialTypecheck = store => next => action => {
  next(action)
  if (action.type === "@@router/LOCATION_CHANGE") {
    next(typecheck())
  }
}

const enhancers = []
const middleware = [
  initialTypecheck, thunk, routerMiddleware(history)
]

const devToolsExtension = window.devToolsExtension

if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension())
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export const store = createStore(
  combineReducers({
    editing: reducer,
    router: routerReducer
  }),
  composedEnhancers
)
