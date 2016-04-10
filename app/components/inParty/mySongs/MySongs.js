let React = require('react');
let Firebase = require('firebase');
let { getTrackData, formatId } = require('../../../util/rhapsodyMetaData');
let PartyListItem = require('../../shared/PartyListItem');

let MySongs = React.createClass({
  contextTypes: {
    mySongs: React.PropTypes.object,
    removeSong: React.PropTypes.func
  },

  getInitialState () {
    return {
      mySongData: []
    };
  },

  componentDidMount () {
    this.getSongData(Object.keys(this.context.mySongs));
  },

  componentWillUpdate (newProps, newState, newContext) {
    let newSongs = Object.keys(newContext.mySongs).sort();
    let oldSongs = Object.keys(this.context.mySongs).sort();
    let diff = [];
    diff = diff.concat(oldSongs.filter((oldS) => {
      return newSongs.indexOf(oldS) === -1;
    }));
    diff = diff.concat(newSongs.filter((newS) => {
      return oldSongs.indexOf(newS) === -1;
    }));
    if (diff.length > 0) {
      this.getSongData(newSongs);
    }
  },

  getSongData (songs) {
    let trackDataArry = songs.map((song) => {
      return getTrackData(formatId(song));
    });
    Promise.all(trackDataArry).then((songData) => {
      this.setState({
        mySongData: songData
      });
    }, (err) => {
      // error for some reason
      console.log('error', err);
    });
  },

  render () {
    let mySongs = this.state.mySongData.sort().map((song, i) => {
      return (
        <PartyListItem key={i}  
          mainText={ song.name }
          subText={ song.artist.name + ' - ' + song.album.name }
          imgSrc={ `http://direct.rhapsody.com/imageserver/v2/albums/${song.album.id}/images/70x70.png` }
          imgAlt={ song.name }
          iconClass="fa fa-close"
          onIconClick={ this.context.removeSong.bind(null, song.id) }
        />
      );
    });
    return (
      <div className="tab-content searchResults">
        <div className="searchListContainer">
          <h1>My Songs</h1>
          <ul className="list">
            { mySongs }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = MySongs;
