let React = require('react'),
  SearchMixin = require('./SearchMixin'),
  SearchItem = require('./SearchItem');

let SearchArtists = React.createClass({
  mixins: [ SearchMixin ],

  propTypes: {
    updateRoute: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired
  },

  options: {limit: 25},
  searchType: ['artist'],

  render () {
    let artists;
    if (this.state.data.length > 0) {
      artists = this.state.data[0].data.map((d, i) => {
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
      <div className="searchResults">
        <div className="searchListContainer">
          <a className="navLink" onClick={ this.props.router.goBack }>{ '< Back' }</a>
          <ul className="list artist-tile">
            { artists }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SearchArtists;
