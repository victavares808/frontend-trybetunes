import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
/* Sobre <audio> <track> </audio>
 ref->https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/track
Sobre <code> ref -> https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/code
 */
class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loadingMessage: false,
      favorited: false,
    };
  }

  FavoriteButtonValidation= (event) => {
    const { music } = this.props;
    console.log(music);
    this.setState({
      loadingMessage: true,
      favorited: event.target.checked,
    }, async () => {
      await addSong(music);
      this.setState({
        loadingMessage: false,
      });
    });
  }

  render() {
    const { trackInfo } = this.props;
    const { previewSong } = this.props;
    const { id } = this.props;
    const { favorited, loadingMessage } = this.state;
    const showLoadingMessage = <p>Carregando...</p>;

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
                id={ previewSong }
                type="checkbox"
                data-testid={ `checkbox-music-${id}` }
                onChange={ this.FavoriteButtonValidation }
                checked={ favorited }
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
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

MusicCard.defaultProps = {
  music: {},
};

export default MusicCard;
