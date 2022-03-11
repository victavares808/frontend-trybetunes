import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabledButton: true,
      artistName: '',
    };
  }

  searchButtonValidation = () => {
    const { artistName } = this.state;
    const minArtistNameLength = 2;
    const artistNameValidation = artistName.length >= minArtistNameLength;
    if (artistNameValidation) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.searchButtonValidation);
  }

  render() {
    const { disabledButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="artistName"
            type="text"
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            disabled={ disabledButton }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
