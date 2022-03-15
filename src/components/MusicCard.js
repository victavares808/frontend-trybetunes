import PropTypes from 'prop-types';
import React, { Component } from 'react';
/* Sobre <audio> <track> </audio>
 ref->https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/track
Sobre <code> ref -> https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/code
 */
class MusicCard extends Component {
/*   constructor () {
    super();
    this.state = {
      loading
    };
  } */

  render() {
    const { trackInfo, previewtrack } = this.props;
    return (
      <div>
        <h4>
          {
            trackInfo
          }
        </h4>
        <audio data-testid="audio-component" src={ previewtrack } controls>
          <track kind="captions" />
          Your chosen track
        </audio>
        <code>song</code>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackInfo: PropTypes.string.isRequired,
  previewtrack: PropTypes.string.isRequired,
};

export default MusicCard;
