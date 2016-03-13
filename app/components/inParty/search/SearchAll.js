let React = require('react'),
  SearchMixin = require('./SearchMixin'),
  SearchItem = require('./SearchItem');

let SearchAll = React.createClass({
  mixins: [ SearchMixin ],

  propTypes: {
    updateRoute: React.PropTypes.func.isRequired,
    addTrack: React.PropTypes.func.isRequired
  },

  options: {limit: 5},
  searchType: ['track', 'album', 'artist'],

  handleRouteUpdate (type) {
    this.props.updateRoute(type);
  },

  render () {
    let tracks, albums, artists;
    if (this.state.data.length > 0) {
      tracks = this.state.data[0].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.props.addTrack }
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
      artists = this.state.data[2].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.props.updateRoute }
            type="artist"
          />
        );
      });
    } 

    return (
      <div>
        <a onClick={ this.handleRouteUpdate.bind(null, 'tracks') }>more tracks >></a>
        <ul className="list">
          { tracks }
        </ul>
        <a onClick={ this.handleRouteUpdate.bind(null, 'albums') }>more albums >></a>
        <ul className="list">
          { albums }
        </ul>
        <a onClick={ this.handleRouteUpdate.bind(null, 'artists') }>more artists >></a>
        <ul className="list">
          { artists }
        </ul>
      </div>
    );
  }
});

module.exports = SearchAll;
