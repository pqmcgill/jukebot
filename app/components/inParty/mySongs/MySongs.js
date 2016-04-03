let React = require('react');
let Firebase = require('firebase');

let MySongs = React.createClass({
  contextTypes: {
    mySongs: React.PropTypes.object
  },

  getInitialState () {
    return {
      mySongs: []
    };
  },

  render () {
    let mySongs = Object.keys(this.context.mySongs).map((song, i) => {
      return <li key={i} >{ song }</li>;
    });
    return (
      <div>
        <h1>My Songs</h1>
        <ul>
          { mySongs }
        </ul>
      </div>
    );
  }
});

module.exports = MySongs;
