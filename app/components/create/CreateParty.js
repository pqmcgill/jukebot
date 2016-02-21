let React = require('react');
let SongSearch = require('../inParty/search/SongSearch');

let rhapsodyUtil = require('../../util/rhapsodyUtil');

let CreateParty = React.createClass({

  tracks: [
    'Tra.2169032',
    'Tra.7289598',
    'Tra.5156525',
    'Tra.5156526',
    'Tra.202338320',
    'Tra.3310729',
    'Tra.5156522',
    'Tra.30638627',
    'Tra.20950996',
    'Tra.7289599'
  ],

  playTracks () {
  
  },

  render () {
    return (
      <div className="component loginSignup">
        <h1>create Party</h1>
        <SongSearch className="search" />
      </div>
    );
  }
});

module.exports = CreateParty;
