
let React = require('react'),
  SearchMixin = require('./SearchMixin'),
  SearchItem = require('./SearchItem');

let SearchAlbums = React.createClass({
  mixins: [ SearchMixin ],

  propTypes: {
    updateRoute: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired
  },

  options: {limit: 25},
  searchType: ['album'],

  render () {
    let albums;
    if (this.state.data.length > 0) {
      albums = this.state.data[0].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.props.updateRoute }
            type="album"
          />
        );
      });
    }
    return (
      <div>
        <a onClick={ this.props.router.goBack }>{ '<< Back' }</a>
        <ul className="list">
          { albums }
        </ul>
      </div>
    );
  }
});

module.exports = SearchAlbums;
