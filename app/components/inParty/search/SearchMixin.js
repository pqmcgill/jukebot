let debounce = require('../../../util/util').debounce,
  rhapsodyMetaData = require('../../../util/rhapsodyMetaData');

module.exports = {
  getInitialState () {
    return { 
      data: [],
      searchErr: null,
      loading: false
    };
  },

  componentWillMount () {
    let search = debounce(this.inefficientSearch, 100);
    this.search = (options, type, cb) => {
      return search(options, type, cb);
    };

    this.options.q = this.props.query;
    this.options.albumId = this.decodeUrlParam(this.props.albumId);
    this.options.artistId = this.decodeUrlParam(this.props.artistId);
    this.search(this.options, this.searchType);
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.query && nextProps.query.length > 0) {
      this.options.q = nextProps.query;
      this.search(this.options, this.searchType);
    }
  },

  decodeUrlParam (param) {
    if (param) {
      return param.replace('_', '.');
    }
  },

  inefficientSearch (options, type) {
    this.setState({
      loading: true
    }, () => {
      if (this.searchType === 'artistsTracks') {
        rhapsodyMetaData.getArtistData(this.options.artistId).then(
          (data) => {
            this.setState({
              data: data,
              searchErr: null,
              loading: false
            });
          },
          (err) => {
            this.setState({
              data: [],
              searchErr: 'An error occurred while searching...',
              loading: false
            });
          }
        );
      } else if (this.searchType === 'albumsTracks') {
        rhapsodyMetaData.getAlbumTracks(this.options.albumId).then(
          (data) => {
            this.setState({
              data: data,
              searchErr: null,
              loading: false
            });
          },
          (err) => {
            this.setState({
              data: [],
              searchErr: 'An error occurred while searching...',
              loading: false
            });
          }
        );
      } else {
        rhapsodyMetaData.searchByType(options, type).then(
          (data) => {
            if (this.props.query.length > 0) {
              this.setState({
                data: data,
                searchErr: null,
                loading: false
              });
            }
          },

          (err) => {
            if (this.props.query.length > 0) { 
              this.setState({
                data: [],
                searchErr: 'An error occurred while searching...',
                loading: false
              });
            }
          }
        );
      }
    });
  }
};
