let React = require('react'),
  ReactFireMixin = require('reactfire'),
  firebaseUtil = require('../../util/firebaseUtil');

let PartyListItem = require('./PartyListItem');

let PartyList = React.createClass({
  mixins: [ ReactFireMixin ],

  getInitialState () {
    return {
      parties: []
    };
  },

  componentWillMount () {
    let partiesRef = new Firebase('https://jukebot.firebaseio.com/parties');
    this.bindAsArray(partiesRef, 'parties');
  },

  joinParty (e) {
    e.preventDefault();
    console.log('joining party');
  },

  render () {
    let parties;
    if (this.state.parties.length === 0) {
      parties = '';
    } else {
      parties = this.state.parties.map((party, i) => {
        return <PartyListItem key={i} 
          name={ party.displayName } 
          onMyClick={ this.joinParty }
        />;
      });
    } 

    return (
      <ul>
        { parties }
      </ul>
    );
  }
});

module.exports = PartyList;
