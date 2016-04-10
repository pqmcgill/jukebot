let React = require('react'),
  { search, getTrackData } = require('../../../util/rhapsodyMetaData'),
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
    }, this.updateRoute);
    this.context.router.listenBefore((obj) => {
      if (obj.action === 'POP') {
        let all = obj.pathname.indexOf('/all');
        let album = obj.pathname.indexOf('/albums/Alb');
        let artist = obj.pathname.indexOf('/artists/Art');
        let path = obj.pathname.split('/');
        let param = path[path.length - 1];
        if (all >= 0) {
          this.updateSearchType('all', null, true);
        } else if (album >= 0) {
          this.updateSearchType('albumId', param, true);
        } else if (artist >= 0) {
          this.updateSearchType('artistId', param, true);
        } else {
          this.updateSearchType(param, null, true);
        }
      }
    });
  },

  updateRoute () {
    if (this.state.query.length > 0) {
      this.context.router.replace('/parties/' + this.props.params.partyId + '/search/all?q=' + this.state.query);
    } else {
      this.context.router.push('/parties/' + this.props.params.partyId + '/search');
    }	
  },

  handleChange (e) {
    let q = e.target.value;
    this.setState({
      query: q
    }, this.updateRoute);
  },

  updateSearchType (type, id, pop) {
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
          <SearchInput placeholder="search..." onChange={ this.handleChange } value={ this.state.query }/>
          { child }
        </div>
      );
    }
});

module.exports = SearchContainer;
