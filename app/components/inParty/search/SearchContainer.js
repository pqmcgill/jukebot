let React = require('react'),
  search = require('../../../util/rhapsodyMetaData').search,
  SearchAll = require('./SearchAll'),
  SearchTracks = require('./SearchTracks'),
  SearchAlbums = require('./SearchAlbums'),
  SearchArtists = require('./SearchArtists'),
  SearchAlbum = require('./SearchAlbum'),
  SearchArtist = require('./SearchArtist');

let SearchContainer = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    addSongToBucket: React.PropTypes.func
  },

  getInitialState () {
    return {
      query: ''
    };
  },

  componentWillMount () {
    let query = this.props.location.query.q || '';
    this.setState({
      query: query
    });
  },

  handleChange (e) {
    let q = e.target.value;
    this.setState({
      query: q
    }, () => {
      if (this.state.query.length > 0) {
        this.context.router.replace('/parties/' + this.props.params.partyId + '/search/all?q=' + this.state.query);
      } else {
        this.context.router.push('/parties/' + this.props.params.partyId + '/search');
      }	
    });
  },

  updateSearchType (type, id) {
    let { partyId } = this.props.params;
    if (id) {
      id = this.urlSafeString(id);
    }
    let route = '/parties/' + partyId + '/search';
    if (type === 'artistId') {
      route += '/artists/' + id;
    } else if (type === 'albumId') {
      route += '/albums/' + id;
    } else {
      route += '/' + type;
    }
    this.context.router.push(route + '?q=' + this.state.query);
  },

  addTrack (id) {
    this.context.addSongToBucket( id );
  },

  urlSafeString (str) {
    if (str) {
      return str.replace('.', '_');
    }
  },

  render () {
    let { partyId, artistId, albumId } = this.props.params;
    artistId = this.urlSafeString(artistId);
    albumId = this.urlSafeString(albumId);
    let child;
    switch (this.props.location.pathname) {
      case '/parties/' + partyId + '/search/all':
        child = (
          <SearchAll query={ this.state.query }
            addTrack={ this.addTrack }
            updateRoute={ this.updateSearchType }
          />
        );
        break;
      case '/parties/' + partyId + '/search/tracks':
        child = (
          <SearchTracks query={ this.state.query }
            addTrack={ this.addTrack }
            router={ this.context.router }
          />
        );
        break;
      case '/parties/' + partyId + '/search/artists':
        child = (
          <SearchArtists query={ this.state.query }
            updateRoute={ this.updateSearchType }
            router={ this.context.router }
          />
        );
        break;
      case '/parties/' + partyId + '/search/artists/' + artistId:
        child = (
          <SearchArtist
            updateRoute={ this.updateSearchType }
            router={ this.context.router }
            addTrack={ this.addTrack }
            artistId={ this.props.params.artistId }
          />
        );
        break;
      case '/parties/' + partyId + '/search/albums':
        child = (
          <SearchAlbums query={ this.state.query }
            updateRoute={ this.updateSearchType }
            router={ this.context.router }
          />
        );
        break;
      case '/parties/' + partyId + '/search/albums/' + albumId:
        child = (
          <SearchAlbum
            updateRoute={ this.updateSearchType }
            router={ this.context.router }
            addTrack={ this.addTrack }
            albumId={ this.props.params.albumId }
          />
        );
        break;
      default:
    }

      return (
        <div className="fixed-offset">
          <div className="search">
            <span className="fa fa-search"></span>
            <input placeholder="search..." onChange={ this.handleChange } value={ this.state.query }/>
          </div>
          { child }
        </div>
      );
    }
});

module.exports = SearchContainer;
