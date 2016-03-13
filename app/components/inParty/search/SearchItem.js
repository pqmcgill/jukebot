let React = require('react');

let albumImgBaseUrl = 'http://direct.rhapsody.com/imageserver/v2/albums/';
let albumExt = '/images/70x70.png';
let artistImgBaseUrl = 'http://direct.rhapsody.com/imageserver/v2/artists/';
let artistExt = '/images/70x47.png';

let SearchItem = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    btnSrc: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired,
    type: React.PropTypes.string.isRequired
  },

  loadAlbumImg (albumId) {
    return albumImgBaseUrl + albumId + albumExt;
  },

  loadArtistImg (artistId) {
    return artistImgBaseUrl + artistId + albumExt;
  },

  render () {
    let listItem;
    if (this.props.type === 'track') {
      listItem = (
        <li className="listItem" onClick={ this.props.onClick.bind(null, this.props.data.id) }>
          <img src={ this.loadAlbumImg(this.props.data.album.id) } alt="albumArt" />
          { this.props.data.name }
          <button>{ '\u2713' }</button>
        </li>
      );
    } else if (this.props.type === 'artist') {
      listItem = (
        <li className="listItem" onClick={ this.props.onClick.bind(null, 'artistId', this.props.data.id) }>
          <img className="artist-pic" src={ this.loadArtistImg(this.props.data.id) } alt="artistPic" />
          { this.props.data.name }
          <button>{ '>' }</button>
        </li>
      );
    } else {
      listItem = (
        <li className="listItem" onClick={ this.props.onClick.bind(null, 'albumId', this.props.data.id) }>
          <img src={ this.loadAlbumImg(this.props.data.id) } alt="albumArt" />
          { this.props.data.name }
          <button>{ '>' }</button>
        </li>
      );
    }

    return listItem;
  }
});

module.exports = SearchItem;
