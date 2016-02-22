let React = require('react');
let SongSearch = require('../inParty/search/SongSearch');

let ReactFireMixin = require('reactfire');
let rhapsodyUtil = require('../../util/rhapsodyUtil');

let CreateParty = React.createClass({
  mixins: [ ReactFireMixin ],

  getInitialState () {
    return {
      tracks: []
    };
  },

  componentWillMount () {
    rhapsodyUtil.registerListener('queuechanged', this.handleQueueChange);
    this.tracksRef = new Firebase('https://jukebot.firebaseio.com/tracks');
    this.bindAsArray(this.tracksRef, 'tracks');
  },

  handleQueueChange () {
    console.log(this.state.tracks);
    if (this.state.tracks.length > 0) {
      let track = this.state.tracks[0];
      console.log(track);
      let trackRef = new Firebase('https://jukebot.firebaseio.com/tracks/' + track['.key']);
      trackRef.remove();
      rhapsodyUtil.playTrack(track['.value']);
    }
  },

  playTracks () {
    this.handleQueueChange();
  },

  addTrack (track) {
    this.firebaseRefs['tracks'].push(track);
  },

  render () {
    return (
      <div className="component loginSignup">
        <h1>create Party</h1>
        <button onClick={ this.playTracks }>Play!</button>
        <SongSearch className="search" onTrackSelect={ this.addTrack }/>
      </div>
    );
  }
});

module.exports = CreateParty;
