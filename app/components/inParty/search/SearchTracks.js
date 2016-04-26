let React = require('react'),
  SearchMixin = require('./SearchMixin'),
  SearchItem = require('./SearchItem');

let SearchTracks = React.createClass({

  contextTypes: {
    updateRoute: React.PropTypes.func,
    goBack: React.PropTypes.func,
    data: React.PropTypes.array,
    getTracks: React.PropTypes.func,
    addTrack: React.PropTypes.func
  },
  
  componentWillMount () {
    this.context.getTracks();
  },

  render () {
    let tracks;
    console.log('tracks:', this.context.data);
    if (this.context.data.length > 0) {
      tracks = this.context.data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.context.addTrack.bind(null, d.id) }
            type="track"
          />
        );
      });
    }
    return (
      <div className="searchResults">
        <div className="searchListContainer">
          <a className="navLink" onClick={ this.context.goBack }>{ '< Back' }</a>
          <ul className="list song-full-tile">
            { tracks }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SearchTracks;
