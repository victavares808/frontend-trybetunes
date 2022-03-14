import propTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/*  Req6 pt 1 - criando componente com informações do artista
 1 - pegando objetos do array e colocando-os como props
 2 - criadas constantes fixingDateElem e dateElement para corrir excesso de
 caracteres na data de lançamento do album com o uso do método slice -> https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/slice
 2 - criando  dentro da area de renderização div para alocar as props para a exibição.
 3 - Tag Nav link : https://v5.reactrouter.com/web/api/NavLink */
class AlbumData extends Component {
  render() {
    const {
      collectionId,
      collectionName,
      artworkUrl100,
      releaseDate,
    } = this.props;

    const fixingDateElem = 10;
    const dateElement = `Lançamento: ${releaseDate.slice(0, fixingDateElem)}`;

    return (
      <div>
        <h3>{ collectionName }</h3>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img src={ artworkUrl100 } alt="Album Cover" />
        </Link>
        <p>{ dateElement }</p>
      </div>

    );
  }
}

AlbumData.propTypes = {
  collectionId: propTypes.number.isRequired,
  collectionName: propTypes.string.isRequired,
  artworkUrl100: propTypes.string.isRequired,
  releaseDate: propTypes.string.isRequired,
};

export default AlbumData;
