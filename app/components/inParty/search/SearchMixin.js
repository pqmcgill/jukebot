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
    let data = this.state.data.map((d) => {
      let ret = d;
      if (d.type === 'track') {
        if (d.data) {
          d.data = d.data.map((t) => {
            if (Object.keys(this.props.bucket).some((s) => {
              return s === this.encodeUrlParam(t.id);
            })) {
              t.selected = true;
            } 
            return t;
          });
        }
      }
      return ret;
    });
    this.setState({ data: data });
    if (nextProps.query && nextProps.query.length > 0 && nextProps.query !== this.props.query) {
      this.options.q = nextProps.query;
      this.search(this.options, this.searchType);
    }
  },

  decodeUrlParam (param) {
    if (param) {
      return param.replace('_', '.');
    }
  },

  encodeUrlParam (param) {
    if (param) {
      return param.replace('.', '_');
    }
  },

  loadData (data) {
    this.setState({
      data: data,
      searchErr: null,
      loading: false
    });
  },

  throwErr (err) {
    this.setState({
      data: [],
      searchErr: err,
      loading: false
    });
  },

  inefficientSearch (options, type) {
    this.setState({
      loading: true
    }, () => {
      if (this.searchType === 'artistsTracks') {
        rhapsodyMetaData.getArtistData(this.options.artistId).then(
          this.loadData,
          this.throwErr
        );
      } else if (this.searchType === 'albumsTracks') {
        rhapsodyMetaData.getAlbumTracks(this.options.albumId).then(
          this.loadData,
          this.throwErr
        );
      } else {
        rhapsodyMetaData.searchByType(options, type).then(
          this.loadData,
          this.throwErr
        );
      }
    });
  }
};
