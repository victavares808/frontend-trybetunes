import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      artist: '',
      album: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = () => {
    this.setState(
      { loading: true },
      async () => {
        const { match } = this.props;
        const { id } = match.params;
        const answer = await getMusics(id);
        this.setState({
          loading: false,
          musics: answer.filter((music, index) => index !== 0),
          artist: answer[0].artistName,
          album: answer[0].collectionName,
          albumArtwork: answer[0].artworkUrl100,
        });
      },
    );
  }

  render() {
    const { musics, artist, album, albumArtwork, loading } = this.state;
    const showLoadingMessage = <p>Carregando...</p>;
    return (
      <>
        <Header />
        <div data-testid="page-album">Album</div>
        {loading ? (
          showLoadingMessage
        ) : (
          <div>
            <h2 data-testid="album-name">{album}</h2>
            <img src={ albumArtwork } alt="" />
            <h3 data-testid="artist-name">{artist}</h3>
            {musics.map((song) => (
              <MusicCard
                id={ song.trackId }
                previewSong={ song.previewUrl }
                key={ song.trackId }
                music={ musics }
                trackInfo={ song.trackName }
                artist={ song.artistName }
              />
            ))}
          </div>
        )}
      </>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
Album.defaultProps = {
  match: {},
};
export default Album;
