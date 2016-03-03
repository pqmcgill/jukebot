let React = require('react'),
  firebaseUtil = require('../../util/firebaseUtil'),
  rhapsodyUtil = require('../../util/rhapsodyUtil'),
  { CLIENT_ID } = require('../../util/constants'),
  $ = require('jquery');

let start_img = require('../../images/start.png');
let join_img = require('../../images/join.png');

let Home = React.createClass({
  propTypes: {
    history: React.PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired
  },

  componentWillMount () {
    let code = this.props.location.query.code;
    if (code) {
      rhapsodyUtil.authenticate(code, this.handleRhapsodyAuth);
    }

    //TODO: route user to their resumed party if applicable
  },

  handleRhapsodyAuth (err) {
    if (err) {
      console.log('ERROR with RHAPSODY');
      return;
    }
    // TODO: determine if host is resuming party.
    // if so, route to inParty page
    this.context.router.push('/create');
  },

  // handle loggin out of firebase and rhapsody
  logout (e) {
    e.preventDefault();
    rhapsodyUtil.clearTokens();
    firebaseUtil.logout();
    this.context.router.replace('/welcome');
  },

  // navigate to the list of available parties
  goToPartyList () {
    this.context.router.push('/parties');
  },

  // navigate to the party creation page
  goToCreate () {
    rhapsodyUtil.authenticate(null, this.handleRhapsodyAuth);
  },

  render () {
    return (
      <div className="component home no-padding">
        <div className="wrapper">
          <a onClick={ this.logout }>logout</a>
          <button className="btn-jumbo" onClick={ this.goToCreate }>
            <img src={ start_img }/>
          </button>
          <button className="btn-jumbo" onClick={ this.goToPartyList }>
            <img src={ join_img }/>
          </button>
        </div>
      </div>
    );
  }
});

module.exports = Home;
