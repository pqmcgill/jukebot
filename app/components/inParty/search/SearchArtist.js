let React = require('react'),
  SearchMixin = require('./SearchMixin'),
  SearchItem = require('./SearchItem');

let SearchArtist = React.createClass({

  contextTypes: {
    updateRoute: React.PropTypes.func,
    getArtist: React.PropTypes.func,
    data: React.PropTypes.array,
    goBack: React.PropTypes.func
  },
  
  componentWillMount () {
    this.context.getArtist();
  },
  
  render () {
    let tracks,
      albums,
      artistId,
      artistName,
      artistUrl;

    if (this.context.data.length > 0) {
      tracks = this.context.data[0].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ () => {} }
            type="track"
          />
        );
      });
      albums = this.context.data[1].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.context.updateRoute }
            type="album"
          />
        );
      });

      artistId = this.context.data[1].data[0].artist.id;
      artistName = this.context.data[1].data[0].artist.name;
      artistUrl = `http://direct.rhapsody.com/imageserver/v2/artists/${artistId}/images/150x100.jpg`;

    }
    return (
      <div>
        <div className="artist-header">
          <div className="image-cropper">
            <img src={ artistUrl }/>
          </div>
          <div className="title">{ artistName }</div>
        </div>
        <div className="searchResults">
          <div className="searchListContainer">
            <span className="listHeader">Top Tracks</span>
            <a className="navLink" onClick={ this.context.goBack }>{ '< Back' }</a>
            <ul className="list song-full-tile">
              { tracks }
            </ul>
          </div>
          <div className="searchListContainer">
            <span className="listHeader">Albums</span>
            <ul className="list album-tile">
              { albums }
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchArtist;
