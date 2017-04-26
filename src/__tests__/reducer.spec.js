import subject, { initialState } from '../reducer'
import TYPES from '../types'

it('has an initial state', () => {
  expect(subject().films).toEqual([])
  expect(subject().people).toEqual({})
})

it('adds film on TYPES.FETCH_FILM_SUCCESS', () => {
  const film = { title: 'Return of the Jedi', episode: 6, characters: [1, 2, 3] }
  const action = { type: TYPES.FETCH_FILM_SUCCESS, film }

  const nextState = subject(initialState, action)

  expect(nextState.films[0]).toEqual(film)
})

it('adds person on TYPES.FETCH_PERSON_SUCCESS', () => {
  const person = { id: 1, name: 'Luke Skywalker' }
  const action = { type: TYPES.FETCH_PERSON_SUCCESS, person }

  const nextState = subject(initialState, action)

  expect(nextState.people[person.id]).toEqual(person)
})
