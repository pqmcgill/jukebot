let React = require('react'),
  SearchMixin = require('./SearchMixin'),
  SearchItem = require('./SearchItem');

let SearchArtist = React.createClass({
  mixins: [ SearchMixin ],

  propTypes: {
    updateRoute: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired,
    addTrack: React.PropTypes.func.isRequired,
    artistId: React.PropTypes.string.isRequired
  },

  searchType: 'artistsTracks',
  options: {},

  render () {
    let tracks,
      albums,
      artistId,
      artistName,
      artistUrl;

    if (this.state.data.length > 0) {
      tracks = this.state.data[0].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.props.addTrack.bind(null, d.id) }
            type="track"
          />
        );
      });
      albums = this.state.data[1].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.props.updateRoute }
            type="album"
          />
        );
      });

      artistId = this.state.data[1].data[0].artist.id;
      artistName = this.state.data[1].data[0].artist.name;
      artistUrl = `http://direct.rhapsody.com/imageserver/v2/artists/${artistId}/images/150x100.jpg`;

    }
    return (
      <div>
        { artistName }
        <img src={ artistUrl }/>
        <div className="searchResults">
          <div className="album-header">
          </div>
          <div className="searchListContainer">
            <span className="listHeader">Top Tracks</span>
            <a className="navLink" onClick={ this.props.router.goBack }>{ '< Back' }</a>
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
