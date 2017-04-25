import * as actions from '../actions'
import * as api from '../api'
import TYPES from '../types'

describe('#fetchFilm', () => {
  let dispatch
  const res = { data: { title: 'wow', episode_id: 3, characters: [] } }
  const reqPromise = new Promise(resolve => resolve(res))

  beforeAll(async () => {
    dispatch = jest.fn()
    api.fetchFilm.request = jest.fn(() => reqPromise)

    await actions.fetchFilm(3)(dispatch)
  })

  it('dispatches fetch request', () => {
    expect(dispatch).toBeCalledWith({ type: TYPES.FETCH_FILM_REQUEST, filmId: 3 })
  })

  it('calls api', () => {
    expect(api.fetchFilm.request).toBeCalledWith(3)
  })

  it('dispatches success event', async () => {
    const film = api.fetchFilm.deserializeSuccess(res)
    await reqPromise
    expect(dispatch).toBeCalledWith({ type: TYPES.FETCH_FILM_SUCCESS, film })
  })
})
