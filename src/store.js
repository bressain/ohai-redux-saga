import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducer'

const logger = createLogger({ collapsed: true })

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger,
)(createStore)

const rootReducer = combineReducers({ reducer })

const store = createStoreWithMiddleware(rootReducer)

export default store
