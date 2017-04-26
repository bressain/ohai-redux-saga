import TYPES from './types'

export const initialState = {
  films: [],
  people: {}
}

function handleFetchFilmSuccess(state, action) {
  return { ...state, films: [...state.films, action.film] }
}

function handleFetchPersonSuccess(state, action) {
  return {
    ...state,
    people: {
      ...state.people,
      [action.person.id]: action.person
    }
  }
}

export default function (state = initialState, action = {}) {
  const handlers = {
    [TYPES.FETCH_FILM_SUCCESS]: handleFetchFilmSuccess,
    [TYPES.FETCH_PERSON_SUCCESS]: handleFetchPersonSuccess
  }
  return handlers[action.type]
    ? handlers[action.type](state, action)
    : state
}