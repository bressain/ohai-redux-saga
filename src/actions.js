import * as api from './api'
import TYPES from './types'

const fetchFilmRequest = filmId => ({
  type: TYPES.FETCH_FILM_REQUEST,
  filmId
})

const fetchFilmSuccess = film => ({
  type: TYPES.FETCH_FILM_SUCCESS,
  film
})

const fetchPersonRequest = personId => ({
  type: TYPES.FETCH_PERSON_REQUEST,
  personId
})

const fetchPersonSuccess = (id, person) => ({
  type: TYPES.FETCH_PERSON_SUCCESS,
  person: { ...person, id }
})

export function fetchFilm(filmId) {
  return async (dispatch, getState) => {
    dispatch(fetchFilmRequest(filmId))

    const res = await api.fetchFilm.request(filmId)
    const film = api.fetchFilm.deserializeSuccess(res)
    dispatch(fetchFilmSuccess(film))

    await Promise.all(film.characters.map(personId => fetchPerson(personId)(dispatch, getState)))
  }
}

export function fetchPerson(personId) {
  return async (dispatch, getState) => {
    if (getState().reducer.people[personId])
      return

    dispatch(fetchPersonRequest(personId))
    const res = await api.fetchPerson.request(personId)
    dispatch(fetchPersonSuccess(personId, api.fetchPerson.deserializeSuccess(res)))
  }
}
