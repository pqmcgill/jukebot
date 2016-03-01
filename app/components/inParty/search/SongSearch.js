let React = require('react');

let SearchList = require('./SearchList'),
  rhapsodyMeta = require('../../../util/rhapsodyMetaData');

let rhapsodyUtil = require('../../../util/rhapsodyUtil');

let debounce = require('../../../util/util').debounce;

let SongSearch = React.createClass({
  propTypes: {
    onTrackSelect: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      lists: [],
      query: '',
      searchState: ''
    };
  },

  componentWillMount () {
    let efficientSearch = debounce(this.search, 200);
    this.efficientSearch = (searchType, query, types, e) => {
      return efficientSearch(searchType, query, types, e);
    };
  },

  search (searchType, options, types, e) {
    types = types || [];
    if (options.q.length >= 1) {
      rhapsodyMeta.searchByType(options, types)
        .then(this.searchSuccess.bind(this, searchType))
        .catch(this.searchError);
    } else {
      this.searchSuccess('all', []);
    }
  },

  onSearchChange (e) {
    let val = e.target.value;
    this.setState({ 
      query: val 
    });
    let options = { q: val, limit: 10, offset: 0 };
    this.efficientSearch('all', options, ['track', 'album', 'artist']);
  },

  searchSuccess (searchType, data) {
    console.log(data);
    let lists = [];
    data.forEach((d) => {
      lists.push(d);
    });
    this.setState({
      lists: lists,
      searchType: searchType
    });
  },

  searchMore (type) {
    this.search('more', {
      limit: 25,
      offset: 0,
      q: this.state.query
    }, [type]);
  },

  searchAlbum (albumId) {
    rhapsodyMeta.getAlbumTracks(albumId)
      .then(this.searchSuccess.bind(this, 'album'))
      .catch(this.searchError);
  },

  searchArtist (artistId) {
    rhapsodyMeta.getArtistData(artistId)
      .then(this.searchSuccess.bind(this, 'artist'))
      .catch(this.searchError);
  },

  selectTrack (trackId) {
    this.props.onTrackSelect(trackId);
  },

  searchError (err) {
    // Handle error...
  },

  render () {
    let lists = this.state.lists.map((list, i) => {
      let headerLink = {};
      switch(this.state.searchType) {
        case 'all':
          headerLink.text = `more ${list.type}s`;
          headerLink.click = this.searchMore.bind(null, list.type);
          break;
        case 'more':
          if (list.type === 'album') {
            headerLink.text = `go to artist`;
          }
          break;
        case 'album':
          headerLink.text = `go to ${list.data[0].artist.name}`;
          headerLink.click = this.searchArtist.bind(this, list.data[0].artist.id)
        default:
          break;
      }

      let selectFn;
      switch(list.type) {
        case 'album':
          selectFn = this.searchAlbum;
          break;
        case 'artist':
          selectFn = this.searchArtist;
          break;
        case 'track':
          selectFn = this.selectTrack;
          break;
        default:
          break;
      }

      if (list.data.length > 0) {
        return (
          <SearchList key={i}
            type={ list.type }
            data={ list.data } 
            title={ `Matching ${ list.type.charAt(0).toUpperCase() + list.type.slice(1) }s:` }
            headerLink={ headerLink }
            onItemSelect={ selectFn }
          />
        );
      } else {
        return;
      }
    });
    return (
      <div className="search-container">
        <h1>Song Search</h1>
        <input type="text" onChange={ this.onSearchChange } placeholder="Search..." />
        <div className="search">
          { lists }
        </div>
      </div>
    );
  }
});

module.exports = SongSearch;
