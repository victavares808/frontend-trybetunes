import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loadingMessage: false,
      songLoad: [],
    };
  }

  componentDidMount() {
    getFavoriteSongs();
    this.setState({
      loadingMessage: true,
    }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        songLoad: favorites,
        loadingMessage: false,
      });
    });
  }

  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
      </div>
    );
  }
}

export default Favorites;
