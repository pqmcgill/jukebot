let React = require('react');

let PartyListItem = require('../../shared/PartyListItem');

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
        <PartyListItem mainText={ this.props.data.name }
          selected={ this.props.data.checked }
          subText={ this.props.data.artist.name + ' - ' + this.props.data.album.name}
          onClick={ this.props.onClick.bind(null, this.props.data.id) }
          iconClass="fa fa-plus"
          selectedIconClass="fa fa-check"
          imgSrc={ this.loadAlbumImg(this.props.data.album.id) }
          imgAlt="albumArt" />
      );
    } else if (this.props.type === 'artist') {
      listItem = (
        <PartyListItem mainText={ this.props.data.name }
          onClick={ this.props.onClick.bind(null, 'artistId', this.props.data.id) }
          selected={ this.props.data.checked }
          iconClass="fa fa-chevron-right"
          imageClass="artist-pic"
          imgSrc={ this.loadArtistImg(this.props.data.id) }
          imgAlt="artistArt" />
      );
    } else if (this.props.type === 'album-track') {
      listItem = (
        <PartyListItem mainText={ this.props.data.name }
          selected={ this.props.data.checked }
          onClick={ this.props.onClick.bind(null, this.props.data.id) }
          selectedIconClass="fa fa-check"
          iconClass="fa fa-plus" />
      );
    } else {
      listItem = (
        <PartyListItem mainText={ this.props.data.name }
          subText={ this.props.data.artist.name }
          selected={ this.props.data.checked }
          onClick={ this.props.onClick.bind(null, 'albumId', this.props.data.id) }
          iconClass="fa fa-chevron-right"
          imgSrc={ this.loadAlbumImg(this.props.data.id) }
          imgAlt="albumArt" />
      );
    }

    return listItem;
  }
});

module.exports = SearchItem;
