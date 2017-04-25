import axios from 'axios'

const BASE_URL = 'http://swapi.co/api'

export const fetchFilm = {
  request(filmId) {
    return axios({
      method: 'get',
      url: `${BASE_URL}/films/${filmId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  deserializeSuccess(res) {
    return {
      title: res.data.title,
      episode: res.data.episode_id,
      characters: res.data.characters
    }
  }
}