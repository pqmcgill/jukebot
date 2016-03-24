let React = require('react');
let rhapsodyUtil = require('../../util/rhapsodyUtil');
let firebaseUtil = require('../../util/firebaseUtil');
let Link = require('react-router').Link;
let ReactFireMixin = require('reactfire');
let Firebase = require('firebase');

let PartyContainer = React.createClass({
  mixins: [ ReactFireMixin ],
  
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  
  getInitialState () {
    return {
      party: {},
      user: {}
    };
  },

  componentWillMount () {
    rhapsodyUtil.registerListener('error', this.handleRhapsodyError);
    rhapsodyUtil.registerListener('unauthorized', (e) => {
      console.log('unauthorized in component');
    });
    rhapsodyUtil.init(() => {
      console.log('party started');
    });
    
    // Create Reference to Party Data and User's Data
    let partyRef = new Firebase('https://jukebot.firebaseio.com/parties/' + this.props.params.partyId);
    let userRef = new Firebase('https://jukebot.firebaseio.com/users/' + firebaseUtil.getSession().uid)
    this.bindAsObject(partyRef, 'party');
    this.bindAsObject(userRef, 'user');
  },

  handleRhapsodyError (err) {
    // there was an unauthorized request
    if (err.data.code === 401) {
      rhapsodyUtil.destroyTokens();
      // TODO: display prompt to either re-authenticate or kill party
      rhapsodyUtil.authenticate();
    }
  },

  goToSearch (e) {
    e.preventDefault();
    this.context.router.push('search');
  },

  render () {
    let { partyId } = this.props.params;
    return (
      <div className="component inParty no-padding">
        <div className="tabs">
          <Link className="tab" activeClassName="active" to={ '/parties/' + partyId + '/menu' }>MENU</Link>
          <Link className="tab" activeClassName="active" to={ '/parties/' + partyId + '/search' }>Search</Link>
          <Link className="tab" activeClassName="active" to={ '/parties/' + partyId + '/nowPlaying' }>Now Playing</Link>
          <Link className="tab" activeClassName="active" to={ '/parties/' + partyId + '/mySongs' }>SongList</Link>
        </div>
        { this.props.children }
      </div>
    );
  }
});

module.exports = PartyContainer;
