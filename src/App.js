import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from './actions'

import './App.css'

function mapStateToProps(state) {
  return { store: state.reducer }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFilm: filmId => {
      dispatch(actions.fetchFilm(filmId))
    }
  }
}

class App extends Component {
  componentDidMount() {
    this.props.fetchFilm(3)
  }
  renderFilm(film) {
    return (
      <li key={film.title}>
        <h2>Episode {film.episode}: {film.title}</h2>
        <h3>Characters:</h3>
        <ul>
          {film.characters.map(c => <li>{c}</li>)}
        </ul>
      </li>
    )
  }
  renderFilms() {
    if (!this.props.store.films.length)
      return <div>Loading...</div>

    return (
      <ul>
        {this.props.store.films.map(this.renderFilm)}
      </ul>
    )
  }
  render() {
    return (
      <div>
        <h1>Hooray For Star Wars!</h1>
        {this.renderFilms()}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
