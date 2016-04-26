let React = require('react'),
  { parseId } = require('../../../util/rhapsodyMetaData'),
  SearchItem = require('./SearchItem');

let SearchAlbums = React.createClass({

  contextTypes: {
    updateRoute: React.PropTypes.func,
    goBack: React.PropTypes.func,
    data: React.PropTypes.array,
    getAlbums: React.PropTypes.func
  },
  
  componentWillMount () {
    this.context.getAlbums();
  },

  render () {
    let albums;
    if (this.context.data.length > 0) {
      albums = this.context.data[0].data.map((d, i) => {
        return (
          <SearchItem key={i}
            data={ d }
            btnSrc="something.png"
            onClick={ this.context.updateRoute.bind(null, '/albums/' + parseId(d.id)) }
            type="album"
          />
        );
      });
    }
    return (
      <div className="searchResults">
        <div className="searchListContainer">
          <a className="navLink" onClick={ this.context.goBack }>{ '< Back' }</a>
          <ul className="list album-tile">
            { albums }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SearchAlbums;
