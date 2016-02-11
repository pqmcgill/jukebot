let React = require('react');
let SearchListItem = require('./SearchListItem');

let SearchList = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    type: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    headerLink: React.PropTypes.shape({
      text: React.PropTypes.string,
      click: React.PropTypes.func
    }),
    onItemSelect: React.PropTypes.func
  },

  render () {
    let songs = this.props.data.map((d, i) => {
      let imgUrl;
      if (this.props.type === 'track') {
        console.log('hit');
        imgUrl = `http://direct.rhapsody.com/imageserver/v2/albums/${d.album.id}/images/70x47.jpg`;
      } else if (this.props.type === 'album') {
        imgUrl = `http://direct.rhapsody.com/imageserver/v2/albums/${d.id}/images/70x47.jpg`;
      } else if (this.props.type === 'artist') {
        imgUrl = `http://direct.rhapsody.com/imageserver/v2/artists/${d.id}/images/150x100.jpg`;
      }
      return (
        <li key={i}>
          <SearchListItem text={ d.name } 
            searchId={ d.id } 
            imgUrl={ imgUrl } 
            onSelect={ this.props.onItemSelect }/>
        </li>
      );
    });

    return (
      <div>
        <h2>
          { this.props.title }
          <a onClick={ this.props.headerLink.click }>{ this.props.headerLink.text }</a>
        </h2>
        <ul>
          { songs }
        </ul>
      </div>
    );
  }
});

module.exports = SearchList;
