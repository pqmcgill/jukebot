let React = require('react'),
  SearchMixin = require('./SearchMixin'),
  SearchItem = require('./SearchItem');

let SearchAlbum = React.createClass({
  mixins: [ SearchMixin ],

  propTypes: {
    updateRoute: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired,
    addTrack: React.PropTypes.func.isRequired,
    albumId: React.PropTypes.string.isRequired,
    bucket: React.PropTypes.object
  },

  searchType: 'albumsTracks',
  options: {},

  render () {
    let tracks,
      albumName,
      artistName,
      albumUrl,
      albumId;

    if (this.state.data.length > 0) {
      tracks = this.state.data[0].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.props.addTrack.bind(null, d.id) }
            type="album-track"
          />
        );
      });
      albumId = this.state.data[0].data[0].album.id;
      albumName = this.state.data[0].data[0].name
      artistName = this.state.data[0].data[0].artist.name;
      albumUrl = `http://direct.rhapsody.com/imageserver/v2/albums/${albumId}/images/170x170.jpg`;
    }
    return (
      <div>
        <div className="album-header">
          <img src={ albumUrl } />
          <div className="title">
            <p>{ albumName }</p>
            <p>{ artistName }</p>
          </div>
        </div>
        <div className="searchResults">
          <div className="searchListContainer">
            <span className="listHeader">Tracks</span>
            <a className="navLink" onClick={ this.props.router.goBack }>{ '< Back' }</a>
            <ul className="list song-full-tile">
              { tracks }
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchAlbum;
