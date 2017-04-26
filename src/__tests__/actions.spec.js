import { call, put, select } from 'redux-saga/effects'

import * as actions from '../actions'
import * as api from '../api'
import { select as selector } from '../reducer'
import TYPES from '../types'

describe('#executeFetchFilm', () => {
  const characters = ['http://swapi.co/api/people/1/', 'http://swapi.co/api/people/2/']
  const characterIds = [1, 2]
  const res = { data: { title: 'wow', episode_id: 3, characters } }

  const iterator = actions.executeFetchFilm({ filmId: 3 })

  it('calls api', () => {
    expect(iterator.next().value).toEqual(call(api.fetchFilm.request, 3))
  })

  it('dispatches success event', async () => {
    const film = { ...api.fetchFilm.deserializeSuccess(res), characters: characterIds }
    expect(iterator.next(res).value).toEqual(put({ type: TYPES.FETCH_FILM_SUCCESS, film }))
  })

  it('fetches characters', () => {
    expect(iterator.next().value).toEqual(put({ type: TYPES.FETCH_PERSON_REQUEST, personId: 1 }))
    expect(iterator.next().value).toEqual(put({ type: TYPES.FETCH_PERSON_REQUEST, personId: 2 }))
  })
})

describe('#executeFetchPerson is not cached', () => {
  const res = { data: { name: 'Luke Skywalker' } }
  const state = { people: {} }

  const iterator = actions.executeFetchPerson({ personId: 1 })

  it('checks state for cached', () => {
    expect(iterator.next().value).toEqual(select(selector))
  })

  it('calls api', () => {
    expect(iterator.next(state).value).toEqual(call(api.fetchPerson.request, 1))
  })

  it('dispatches success event', () => {
    const person = { ...api.fetchPerson.deserializeSuccess(res), id: 1 }
    expect(iterator.next(res).value).toEqual(put({ type: TYPES.FETCH_PERSON_SUCCESS, person }))
  })
})

describe('#executeFetchPerson is cached', () => {
  const state = { people: { 3: { name: 'Han Solo' } } }

  const iterator = actions.executeFetchPerson({ personId: 3 })

  it('checks state for cached', () => {
    expect(iterator.next().value).toEqual(select(selector))
  })

  it('does not fetch the person again', () => {
    expect(iterator.next(state).done).toEqual(true)
  })
})