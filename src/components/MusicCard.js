import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

/* Sobre <audio> <track> </audio>
 ref->https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/track
Sobre <code> ref -> https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/code
 */
class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loadingMessage: false,
      favSongs: [],
    };
  }

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState({
      favSongs: favorites,
    });
  }

  FavoriteButtonValidation= (event) => {
    const { music } = this.props;
    const musicId = music.find((song) => (song.trackId === +event.target.id));
    this.setState({
      loadingMessage: true,
    }, async () => {
      if (event.target.checked) {
        await addSong(musicId);
      } else { await removeSong(musicId); }
      const favorites = await getFavoriteSongs();
      this.setState({
        favSongs: favorites,
        loadingMessage: false,
      });
    });
  }

  render() {
    const { trackInfo } = this.props;
    const { previewSong } = this.props;
    const { id } = this.props;
    const { favSongs, loadingMessage } = this.state;
    const showLoadingMessage = <p>Carregando...</p>;
    console.log(favSongs);
    return (
      <section>
        {loadingMessage ? (
          showLoadingMessage
        ) : (
          <div>
            <h4>
              {
                trackInfo
              }
            </h4>
            <audio data-testid="audio-component" src={ previewSong } controls>
              <track kind="captions" />
              Your chosen track
              <code>audio</code>
            </audio>
            <label htmlFor={ id }>
              <input
                id={ id }
                type="checkbox"
                data-testid={ `checkbox-music-${id}` }
                onChange={ this.FavoriteButtonValidation }
                checked={ favSongs.some((element) => element.trackId === id) }
              />
              Favorita
            </label>
          </div>
        )}
      </section>

    );
  }
}
MusicCard.propTypes = {
  trackInfo: PropTypes.string.isRequired,
  previewSong: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  music: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
