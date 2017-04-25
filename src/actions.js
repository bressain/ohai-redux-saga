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

export function fetchFilm(filmId) {
  return async (dispatch) => {
    dispatch(fetchFilmRequest(filmId))
    const res = await api.fetchFilm.request(filmId)
    dispatch(fetchFilmSuccess(api.fetchFilm.deserializeSuccess(res)))
  }
}