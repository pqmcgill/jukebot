let React = require('react');
let { formatId } = require('../../../util/rhapsodyMetaData');

let NowPlaying = React.createClass({
  contextTypes: {
    nowPlaying: React.PropTypes.object,
    veto: React.PropTypes.func,
    hasVetoed: React.PropTypes.bool
  },

  getAlbumArt (albumId) {
    if (albumId) {
      return `http://direct.rhapsody.com/imageserver/v2/albums/${formatId(albumId)}/images/300x300.png`;
    }
  },

  render () {
    console.log(this.context.nowPlaying);
    return (
      Object.keys(this.context.nowPlaying).length > 0 ?
        <div className="tab-content fixed-offset">
          <img src={ this.getAlbumArt(this.context.nowPlaying.albumId) }/>
          <p>{ this.context.nowPlaying.trackName }</p>
          <p>{ this.context.nowPlaying.artistName }</p>
          <p>{ this.context.nowPlaying.albumName }</p>
          <p>selected by: { this.context.nowPlaying.selectedBy }</p>
          <button disabled={ this.context.hasVetoed } onClick={ this.context.veto }>Veto</button>
        </div> :

        <div className="tab-content">content can go here when there is no currently playing song</div>
    );
  }
});

module.exports = NowPlaying;
