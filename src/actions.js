import { call, put, select } from 'redux-saga/effects'

import * as api from './api'
import { select as selector } from './reducer'
import TYPES from './types'

export const fetchFilm = filmId => ({
  type: TYPES.FETCH_FILM_REQUEST,
  filmId
})

const fetchFilmSuccess = film => ({
  type: TYPES.FETCH_FILM_SUCCESS,
  film
})

export const fetchPerson = personId => ({
  type: TYPES.FETCH_PERSON_REQUEST,
  personId
})

const fetchPersonSuccess = (id, person) => ({
  type: TYPES.FETCH_PERSON_SUCCESS,
  person: { ...person, id }
})

export function* executeFetchFilm({ filmId }) {
  const res = yield call(api.fetchFilm.request, filmId)
  const film = api.fetchFilm.deserializeSuccess(res)
  yield put(fetchFilmSuccess(film))

  for (let personId of film.characters) {
    yield put(fetchPerson(personId))
  }
}

export function* executeFetchPerson({ personId }) {
  const state = yield select(selector)
  if (state.people[personId])
    return

  const res = yield call(api.fetchPerson.request, personId)
  yield put(fetchPersonSuccess(personId, api.fetchPerson.deserializeSuccess(res)))
}
