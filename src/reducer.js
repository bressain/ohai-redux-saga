import TYPES from './types'

export const initialState = {
  films: []
}

function handleFetchFilmSuccess(state, action) {
  return { ...state, films: [...state.films, action.film] }
}

export default function (state = initialState, action = {}) {
  const handlers = {
    [TYPES.FETCH_FILM_SUCCESS]: handleFetchFilmSuccess
  }
  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}