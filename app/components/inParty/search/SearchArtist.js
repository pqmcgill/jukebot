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
      albums;
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
    }
    return (
      <div className="searchResults">
        <div className="searchListContainer">
          <a className="navLink" onClick={ this.props.router.goBack }>{ '<< Back' }</a>
          <ul className="list">
            { tracks }
          </ul>
          <ul className="list">
            { albums }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SearchArtist;
