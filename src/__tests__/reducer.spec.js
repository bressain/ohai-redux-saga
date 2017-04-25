import subject, { initialState } from '../reducer'
import TYPES from '../types'

it('has an initial state', () => {
  expect(subject().films).toEqual([])
})

it('adds film on TYPES.FETCH_FILM_SUCCESS', () => {
  const film = { title: 'Return of the Jedi', episode: 6 }
  const action = { type: TYPES.FETCH_FILM_SUCCESS, film }

  const nextState = subject(initialState, action)

  expect(nextState.films[0]).toEqual(film)
})