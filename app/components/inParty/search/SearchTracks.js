let React = require('react'),
  SearchMixin = require('./SearchMixin'),
  SearchItem = require('./SearchItem');

let SearchTracks = React.createClass({
  mixins: [ SearchMixin ],

  propTypes: {
    addTrack: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired
  },

  options: {limit: 25},
  searchType: ['track'],

  render () {
    let tracks;
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
    }
    return (
      <div className="searchResults">
        <div className="searchListContainer">
          <a className="navLink" onClick={ this.props.router.goBack }>{ '<< Back' }</a>
          <ul className="list">
            { tracks }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SearchTracks;
