import React, { Component } from 'react';
import AlbumData from '../components/AlbumData';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabledButton: true,
      loadingMessage: false,
      queryAlbum: '',
      searchedArtist: '',
      albumInfo: [],
    };
  }

  searchButtonValidation = () => {
    const { queryAlbum } = this.state;
    const minArtistNameLength = 2;
    const artistNameValidation = queryAlbum.length >= minArtistNameLength;
    if (artistNameValidation) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      queryAlbum: value,
    }, this.searchButtonValidation);
  }

  handleSearch = (event) => {
    const { queryAlbum } = this.state;
    event.preventDefault();
    this.setState(
      { loadingMessage: true },
      async () => {
        const albumValues = await searchAlbumsAPI(queryAlbum);
        this.setState({
          loadingMessage: false,
          searchedArtist: queryAlbum,
          queryAlbum: '',
          albumInfo: albumValues,
        });
      },
    );
  };

  render() {
    const { disabledButton,
      queryAlbum,
      loadingMessage,
      searchedArtist,
      albumInfo,
    } = this.state;
    const showLoadingMessage = <p>Carregando...</p>;
    const yourSearchResult = `Resultado de álbuns de: ${searchedArtist}`;
    return (
      <div data-testid="page-search">
        <Header />
        {loadingMessage ? (
          showLoadingMessage
        ) : (
          <form>
            <input
              name="artistName"
              value={ queryAlbum }
              type="text"
              onChange={ this.handleChange }
              data-testid="search-artist-input"
            />
            <button
              type="submit"
              disabled={ disabledButton }
              data-testid="search-artist-button"
              onClick={ this.handleSearch }
            >
              Pesquisar
            </button>
          </form>
        )}
        { searchedArtist
          ? (
            <span>
              { yourSearchResult }
            </span>
          )
          : null}
        {albumInfo.length > 0
          ? albumInfo.map((element) => (
            <AlbumData
              key={ element.collectionId }
              { ...element }
            />)) : <span>Nenhum álbum foi encontrado</span>}
      </div>
    );
  }
}

export default Search;
