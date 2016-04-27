let React = require('react'),
  ReactFireMixin = require('reactfire'),
  firebaseUtil = require('../../util/firebaseUtil');

let Link = require('react-router').Link;
let SearchInput = require('../shared/SearchInput');

let PartyListItem = require('./PartyListItem');

let PartyList = React.createClass({
  mixins: [ ReactFireMixin ],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      parties: [],
      filteredParties: [],
      user: {},
      query: ''
    };
  },

  componentWillMount () {
    let partiesRef = new Firebase('https://jukebot.firebaseio.com/parties');
    let userRef = new Firebase('https://jukebot.firebaseio.com/users/' + firebaseUtil.getSession().uid);
    this.bindAsArray(partiesRef, 'parties');
    this.bindAsObject(userRef, 'user');
  },

  first: true,

  componentWillUpdate (prevProps, prevState) {
    if (this.first) {
      this.first = false;
      this.setState({
        filteredParties: this.state.parties.slice()
      });
    }
  },

  joinParty (partyId) {
    if (this.state.user.currentParty === partyId) {
      this.context.router.push('/parties/' + partyId);
    } else {
      this.context.router.push('/join/' + partyId);
    }
  },

  filterParties (e) {
    let val = e.target.value;
    this.setState({
      query: val,
      filteredParties: this.state.parties.filter((party) => {
        return val.length > 0 ? party['.key'].indexOf(val) >= 0 : true;
      })
    });
  },

  render () {
    let parties;
    if (this.state.parties.length === 0) {
      parties = '';
    } else {
      parties = this.state.filteredParties.map((party, i) => {
        return <PartyListItem key={i} 
          partyId={ party['.key'] }
          name={ party['.key'] } 
          onMyClick={ this.joinParty }
        />;
      });
    } 

    return (
      <div className="component inParty">
        <SearchInput onChange={ this.filterParties } query={ this.state.query }/>
        <ul className="party-list">
          { parties }
        </ul>
      </div>
    );
  }
});

module.exports = PartyList;
