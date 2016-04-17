let React = require('react');
let { formatId } = require('../../../util/rhapsodyMetaData');

let NowPlaying = React.createClass({
  contextTypes: {
    nowPlaying: React.PropTypes.object,
    veto: React.PropTypes.func,
    hasVetoed: React.PropTypes.bool,
    startedPlaying: React.PropTypes.bool
  },

  getAlbumArt (albumId) {
    if (albumId) {
      return `http://direct.rhapsody.com/imageserver/v2/albums/${formatId(albumId)}/images/300x300.png`;
    }
  },

  buttonDisabled () {
    return !this.context.startedPlaying || this.context.hasVetoed;
  },

  loadingTrack () {
    return !this.context.startedPlaying && !this.context.hasVetoed;
  },

  render () {
    return (
      Object.keys(this.context.nowPlaying).length > 0 ?
        <div className="tab-content fixed-offset now-playing">
          <img src={ this.getAlbumArt(this.context.nowPlaying.albumId) }/>

          <button disabled={ this.buttonDisabled() } onClick={ this.context.veto }>
            { this.buttonDisabled() ? 
            (this.loadingTrack() ? 'Loading Track...' : 'Voted!') 
            : 'Vote to Veto' }
          </button>

          <p className="track">{ this.context.nowPlaying.trackName }</p>
          <p className="artist">{ this.context.nowPlaying.artistName } - { this.context.nowPlaying.albumName }</p>
          <p className="selected-by">Selected by: { this.context.nowPlaying.selectedBy }</p>
        </div> :

        <div className="tab-content">Waiting on someone to select a song...</div>
    );
  }
});

module.exports = NowPlaying;
