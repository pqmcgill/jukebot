let React = require('react');

let SongList = require('./SongList'),
  rhapsodyMeta = require('../../../util/rhapsodyMetaData');

let debounce = require('../../../util/util').debounce;

let SongSearch = React.createClass({
  getInitialState () {
    return {
      tracks: [],
      artists: [],
      albums: []
    };
  },

  componentWillMount () {
    let efficientSearch = debounce(this.search, 200);
    this.efficientSearch = (e) => {
      return efficientSearch(e);
    };
  },

  search (e) {
    console.log('triggered');
    let val = e.target.value;
    let options = (val.length >= 1) ? { q: val } : {};
    rhapsodyMeta.searchByType(options, ['track', 'artist', 'album'])
      .then(this.searchSuccess)
      .catch(this.searchError);
  },

  searchSuccess (data) {
    data.forEach((d) => {
      this.setState(d);
    });
  },

  searchError (err) {
    // Handle error...
    console.log(err);
  },

  render () {
    return (
      <div>
        <h1>Song Search</h1>
        <input type="text" onChange={ this.efficientSearch } placeholder="Search..." />
        <SongList data={ this.state.tracks } />
      </div>
    );
  }
});

module.exports = SongSearch;
