let React = require('react'),
  _ = require('underscore'),
  { debounce } = require('../../../util/util'),
  { 
    search, 
    searchByType, 
    getTrackData, 
    getArtistData, 
    formatId 
  } = require('../../../util/rhapsodyMetaData'),
  Overlay = require('../../shared/Overlay'),
  Spinner = require('../../shared/Spinner'),
  SearchInput = require('../../shared/SearchInput'),
  SearchAll = require('./SearchAll'),
  SearchTracks = require('./SearchTracks'),
  SearchAlbums = require('./SearchAlbums'),
  SearchArtists = require('./SearchArtists'),
  SearchAlbum = require('./SearchAlbum'),
  SearchArtist = require('./SearchArtist');

let SearchContainer = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    addSongToBucket: React.PropTypes.func,
    mySongs: React.PropTypes.object
  },
  
  childContextTypes: {
    getArtists: React.PropTypes.func,
    getArtist: React.PropTypes.func,
    getAll: React.PropTypes.func,
    getAlbums: React.PropTypes.func,
    getTracks: React.PropTypes.func,
    data: React.PropTypes.array,
    updateRoute: React.PropTypes.func,
    goBack: React.PropTypes.func
  },
  
  getChildContext () {
    return {
      getArtists: this.getArtists,
      getArtist: this.getArtist,
      getAll: this.efficientGetAll,
      getAlbums: this.getAlbums,
      getTracks: this.getTracks,
      data: this.state.data,
      updateRoute: this.updateRoute,
      goBack: this.goBack
    }
  },

  getInitialState () {
    return {
      query: '',
      data: [],
      loading: false
    };
  },

  componentWillMount () {
    let query = this.props.location.query.q || '';
    this.setState({
      query: query
    });
    
    let efficientGetAll = _.debounce(this.getAll, 400);
    this.efficientGetAll = efficientGetAll;
    this.context.router.listenBefore(this.listenBefore);
  },
  
  listenBefore (location) {
    if (location.action === "POP") {
      this.clearData(() => {
        return;
      });
    }
  },
  
  handleChange (e) {
    this.setState({
      loading: true,
      query: e.target.value
    }, () => {
      if (this.state.query.length > 0) {
        this.clearData(() => {
          this.updateRoute('/all');
          this.efficientGetAll();
        });
      } else {
        this.clearData(() => {
          this.updateRoute('/');
          this.setState({
            loading: false
          });
        });
      }
    });
  },
  
  updateRoute (route) {
    this.clearData(() => {
      console.log(route);
      let baseRoute = '/parties/' + this.props.params.partyId + '/search';
      let pathArry = this.props.location.pathname.split('/');
      if ('/' + pathArry[pathArry.length - 1] === route) {
        this.context.router.replace(baseRoute + route + '?q=' + this.state.query);
      } else {
        this.context.router.push(baseRoute + route + '?q=' + this.state.query);
      }
    });
  },
  
  goBack () {
    this.clearData(() => {
      this.context.router.goBack();
    });
  },
  
  clearData (cb) {
    this.setState({
      data: []
    }, cb);
  },
  
  getAll () {
    this.setState({
      loading: true
    }, () => {
       searchByType({
        q: this.state.query,
        limit: 5
      }, ['track', 'album', 'artist']).then((data) => {
        console.log('data', data);
        this.setState({
          data: data,
          loading: false
        });
      }, () => {
        this.setState({
          loading: false
        });
      });
    });
  },
  
  getArtists () {
    this.setState({
      loading: true
    }, () => {
       searchByType({q: this.state.query}, 'artist').then((data) => {
        this.setState({
          data: data[0].data,
          loading: false
        });
      });
    });
  },
  
  getArtist () {
    this.setState({
      loading: true
    }, () => {
      getArtistData(formatId(this.props.params.artistId)).then((data) => {
        this.setState({
          data: data,
          loading: false
        });
      });
    });
  },
  
  getAlbums () {
    this.setState({
      loading: true
    }, () => {
      searchByType({q: this.state.query}, 'album').then((data) => {
        this.setState({
          data: data,
          loading: false
        });
      });
    });
  },
  
  getTracks () {
    this.setState({
      loading: true
    }, () => {
      searchByType({q: this.state.query}, 'track').then((data) => {
        console.log('track data', data);
        this.setState({
          data: data[0].data,
          loading: false
        });
      });
    });
  },

  addTrack (id) {
    getTrackData(id).then((trackData) => {
      this.context.addSongToBucket( trackData );
    });
  },

  urlSafeString (str) {
    if (str) {
      return str.replace('.', '_');
    }
  },

  render () {
    let display = this.state.loading ? {display: 'none'} : {display: 'block'},
      bangDisplay = this.state.loading ? {display: 'block'} : {display: 'none'};
    return (
      <div className="fixed-offset">
        <div className="search-box">
          <SearchInput placeholder="search..." onChange={ this.handleChange } value={ this.state.query }/>
        </div>
        <div style={ bangDisplay }>
          <Spinner className="search-spinner" />
        </div>
        <div style={ display }>
          { this.props.children }
        </div>
      </div>
    );
  }
});

module.exports = SearchContainer;
