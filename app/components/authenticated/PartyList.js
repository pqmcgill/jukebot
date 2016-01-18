let React = require('react'),
  firebaseUtil = require('../../util/firebaseUtil');

let PartyListItem = require('./PartyListItem');

let PartyList = React.createClass({
  getInitialState () {
    return {
      parties: []
    };
  },

  componentDidMount () {
    this.firebaseRef = new Firebase('https://jukebot.firebaseio.com/parties');
    this.firebaseRef.on('value', (snapshot) => {
      let parties = [];
      snapshot.forEach(function(childSnapshot) {
        let party = childSnapshot.val();
        party['.key'] = childSnapshot.key();
        parties.push(party);
      });
      console.log('parties', parties);
      this.setState({
        parties: parties
      });
    });
  },

  componentWillUnmount () {
    this.firebaseRef.off();
  },

  render () {
    let parties;
    if (this.state.parties.length === 0) {
      parties = '';
    } else {
      parties = this.state.parties.map((party, i) => {
        return <PartyListItem key={i} name={ party.displayName }/>;
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
