let React = require('react'),
  SearchItem = require('./SearchItem');

let SearchAlbum = React.createClass({

  contextTypes: {
    updateRoute: React.PropTypes.func,
    goBack: React.PropTypes.func,
    data: React.PropTypes.array,
    addTrack: React.PropTypes.func,
    getAlbum: React.PropTypes.func
  },

  componentWillMount () {
    this.context.getAlbum();
  },

  render () {
    let tracks,
      albumName,
      artistName,
      albumUrl,
      albumId;

    if (this.context.data.length > 0) {
      tracks = this.context.data[0].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.context.addTrack.bind(null, d.id) }
            type="album-track"
          />
        );
      });
      albumId = this.context.data[0].data[0].album.id;
      albumName = this.context.data[0].data[0].name
      artistName = this.context.data[0].data[0].artist.name;
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
            <a className="navLink" onClick={ this.context.goBack }>{ '< Back' }</a>
            <ul className="list song-title-tile">
              { tracks }
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchAlbum;
