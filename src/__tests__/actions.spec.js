import * as actions from '../actions'
import * as api from '../api'
import TYPES from '../types'

describe('#fetchFilm', () => {
  let dispatch
  const characters = ['http://swapi.co/api/people/1/', 'http://swapi.co/api/people/2/']
  const characterIds = [1, 2]
  const res = { data: { title: 'wow', episode_id: 3, characters } }
  const reqPromise = new Promise(resolve => resolve(res))
  const personPromises = []
  const peopleRes = []

  beforeAll(async () => {
    dispatch = jest.fn()
    api.fetchFilm.request = jest.fn(() => reqPromise)
    api.fetchPerson.request = jest.fn(() => {
      const pRes = { data: { name: 'Derp' } }
      const req = new Promise(resolve => resolve(pRes))
      personPromises.push(req)
      peopleRes.push(pRes)
      return req
    })

    await actions.fetchFilm(3)(dispatch)
  })

  it('dispatches fetch request', () => {
    expect(dispatch).toBeCalledWith({ type: TYPES.FETCH_FILM_REQUEST, filmId: 3 })
  })

  it('calls api', () => {
    expect(api.fetchFilm.request).toBeCalledWith(3)
  })

  it('calls api for characters', () => {
    expect(api.fetchPerson.request).toBeCalledWith(1)
    expect(api.fetchPerson.request).toBeCalledWith(2)
  })

  it('dispatches success event', async () => {
    const film = { ...api.fetchFilm.deserializeSuccess(res), characters: characterIds }
    await reqPromise
    expect(dispatch).toBeCalledWith({ type: TYPES.FETCH_FILM_SUCCESS, film })
  })

  it('dispatches person success events', async () => {
    const people = characterIds.map((id, idx) => ({ ...api.fetchPerson.deserializeSuccess(peopleRes[idx]), id }))
    await Promise.all(personPromises)

    for (let person of people) {
      expect(dispatch).toBeCalledWith({ type: TYPES.FETCH_PERSON_SUCCESS, person })
    }
  })
})

describe('#fetchPerson', () => {
  let dispatch
  const res = { data: { name: 'Luke Skywalker' } }
  const reqPromise = new Promise(resolve => resolve(res))

  beforeAll(async () => {
    dispatch = jest.fn()
    api.fetchPerson.request = jest.fn(() => reqPromise)

    await actions.fetchPerson(1)(dispatch)
  })

  it('dispatches fetch request', () => {
    expect(dispatch).toBeCalledWith({ type: TYPES.FETCH_PERSON_REQUEST, personId: 1 })
  })

  it('calls api', () => {
    expect(api.fetchPerson.request).toBeCalledWith(1)
  })

  it('dispatches success event', async () => {
    const person = { ...api.fetchPerson.deserializeSuccess(res), id: 1 }
    await reqPromise
    expect(dispatch).toBeCalledWith({ type: TYPES.FETCH_PERSON_SUCCESS, person })
  })
})