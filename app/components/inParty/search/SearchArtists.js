let React = require('react'),
  SearchMixin = require('./SearchMixin'),
  SearchItem = require('./SearchItem');

let SearchArtists = React.createClass({

  contextTypes: {
    getArtists: React.PropTypes.func,
    data: React.PropTypes.array,
    updateRoute: React.PropTypes.func,
    goBack: React.PropTypes.func
  },
  
  componentDidMount () {
    this.context.getArtists();
  },

  render () {
    let artists;
    console.log(this.context.data);
    if (this.context.data.length > 0) {
      artists = this.context.data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            type="artist"
            onClick={ () => {} }
          />
        );
      });
    }
    return (
      <div className="searchResults">
        <div className="searchListContainer">
          <a className="navLink" onClick={ this.context.goBack }>{ '< Back' }</a>
          <ul className="list artist-tile">
            { artists }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SearchArtists;
