var React = require('react');
  require('../vendor/rhapsody.js');

var Main = React.createClass({
  playTrack (trackId) {
    Rhapsody.player.play(trackId);
  },

  render () {
    return (
      <div>
        Logged In!
        <button onClick={this.playTrack.bind(null, 'Tra.203775828')}>Play!</button>
      </div>
    );
  }
});

module.exports = Main;
