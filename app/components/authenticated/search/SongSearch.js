let React = require('react');

let SongList = require('./SongList'),
  rhapsodyMeta = require('../../../util/rhapsodyMetaData');

let debounce = require('../../../util/util').debounce;

let SongSearch = React.createClass({
  getInitialState () {
    return {
      lists: []
    };
  },

  componentWillMount () {
    let efficientSearch = debounce(this.search, 200);
    this.efficientSearch = (e) => {
      return efficientSearch(e);
    };
  },

  search (e) {
    let val = e.target.value;
    let options = { limit: 10, offset: 0, isTop: true };
    if (val.length >= 1) {
      options.q = val;
      rhapsodyMeta.searchByType(options, ['track', 'album', 'artist'])
        .then(this.searchSuccess)
        .catch(this.searchError);
    } else {
      this.searchSuccess([]);
    }
  },

  searchSuccess (data) {
    let lists = [];
    data.forEach((d) => {
      lists.push(d);
    });
    this.setState({
      lists: lists
    });
  },

  searchError (err) {
    // Handle error...
  },

  render () {
    let lists = this.state.lists.map((list, i) => {
      return (
        <SongList key={i}
          type={ list.type } 
          data={ list.data } 
        />
      );
    });
    return (
      <div>
        <h1>Song Search</h1>
        <input type="text" onChange={ this.efficientSearch } placeholder="Search..." />
        { lists }
      </div>
    );
  }
});

module.exports = SongSearch;
