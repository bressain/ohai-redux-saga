import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({ collapsed: true })

const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware,
  logger,
)(createStore)

const rootReducer = combineReducers({ reducer })

const store = createStoreWithMiddleware(rootReducer)

sagaMiddleware.run(sagas)

export default store
