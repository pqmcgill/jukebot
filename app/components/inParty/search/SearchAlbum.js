let React = require('react'),
  SearchMixin = require('./SearchMixin'),
  SearchItem = require('./SearchItem');

let SearchAlbum = React.createClass({
  mixins: [ SearchMixin ],

  propTypes: {
    updateRoute: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired,
    addTrack: React.PropTypes.func.isRequired,
    albumId: React.PropTypes.string.isRequired
  },

  searchType: 'albumsTracks',
  options: {},

  render () {
    let tracks;
    if (this.state.data.length > 0) {
      tracks = this.state.data[0].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.props.addTrack.bind(null, d.id) }
            type="track"
          />
        );
      });
    }
    return (
      <div>
        <a onClick={ this.props.router.goBack }>{ '<< Back' }</a>
        <ul className="list">
          { tracks }
        </ul>
      </div>
    );
  }
});

module.exports = SearchAlbum;
