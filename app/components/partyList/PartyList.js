let React = require('react'),
  ReactFireMixin = require('reactfire'),
  firebaseUtil = require('../../util/firebaseUtil');

let Link = require('react-router').Link;

let PartyListItem = require('./PartyListItem');

let PartyList = React.createClass({
  mixins: [ ReactFireMixin ],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      parties: []
    };
  },

  componentWillMount () {
    let partiesRef = new Firebase('https://jukebot.firebaseio.com/parties');
    this.bindAsArray(partiesRef, 'parties');
  },

  joinParty (partyId) {
    this.context.router.push('/parties/join/' + partyId);
  },

  render () {
    let parties;
    if (this.state.parties.length === 0) {
      parties = '';
    } else {
      parties = this.state.parties.map((party, i) => {
        console.log('party', party);
        return <PartyListItem key={i} 
          partyId={ party['.key'] }
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
