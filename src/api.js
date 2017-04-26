import axios from 'axios'

const BASE_URL = 'http://swapi.co/api'

function getPersonIds(characters) {
  return characters.map(c => +c.replace(`${BASE_URL}/people/`, '').slice(0, -1))
}

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
      characters: getPersonIds(res.data.characters)
    }
  }
}

export const fetchPerson = {
  request(personId) {
    return axios({
      method: 'get',
      url: `${BASE_URL}/people/${personId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  deserializeSuccess(res) {
    return { name: res.data.name}
  }
}
