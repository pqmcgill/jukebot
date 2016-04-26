let React = require('react'),
  SearchItem = require('./SearchItem'),
  { parseId } = require('../../../util/rhapsodyMetaData');

let SearchAll = React.createClass({

  contextTypes: {
    data: React.PropTypes.array,
    getAll: React.PropTypes.func,
    updateRoute: React.PropTypes.func,
    addTrack: React.PropTypes.func
  },
  
  componentWillMount () {
    this.context.getAll();
  },
  
  handleMore (route) {
    this.context.updateRoute(route);
  },

  render () {
    let tracks, albums, artists;
    if (this.context.data.length > 0) {
      tracks = this.context.data[0].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.context.addTrack.bind(null, d.id) }
            type="track"
          />
        );
      });
      albums = this.context.data[1].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.context.updateRoute.bind(null, '/albums/' + parseId(d.id)) }
            type="album"
          />
        );
      });
      artists = this.context.data[2].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.context.updateRoute.bind(null, '/artists/' + parseId(d.id)) }
            type="artist"
          />
        );
      });
    } 

    return (
      <div className="searchResults">
        <div className="searchListContainer">
          <span className="listHeader">Tracks</span>
          <a className="navLink" onClick={ this.handleMore.bind(null, '/tracks') }>more tracks ></a>
          <ul className="list song-full-tile">
            { tracks }
          </ul>
        </div>
        <div className="searchListContainer">
          <span className="listHeader">Albums</span>
          <a className="navLink" onClick={ this.handleMore.bind(null, '/albums') }>more albums ></a>
          <ul className="list album-tile">
            { albums }
          </ul>
        </div>
        <div className="searchListContainer">
          <span className="listHeader">Artists</span>
          <a className="navLink" onClick={ this.handleMore.bind(null, '/artists') }>more artists ></a>
          <ul className="list artist-tile">
            { artists }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SearchAll;
