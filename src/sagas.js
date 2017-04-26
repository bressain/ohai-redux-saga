import { takeEvery } from 'redux-saga'
import { fork } from 'redux-saga/effects'

import * as actions from './actions'
import TYPES from './types'

function watchEvery(actionType, saga) {
  return fork(function* () {
    yield* takeEvery(actionType, saga)
  })
}

export default function* () {
  yield [
    watchEvery(TYPES.FETCH_FILM_REQUEST, actions.executeFetchFilm),
    watchEvery(TYPES.FETCH_PERSON_REQUEST, actions.executeFetchPerson)
  ]
}
