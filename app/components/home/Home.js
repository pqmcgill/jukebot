let React = require('react'),
  firebaseUtil = require('../../util/firebaseUtil'),
  rhapsodyUtil = require('../../util/rhapsodyUtil');

let Home = React.createClass({
  propTypes: {
    history: React.PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
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
    this.context.router.push('/create');
  },

  render () {
    return (
      <div>
        <button className="btn-primary" onClick={ this.logout }>logout</button>
        <h1>Home</h1>
        <button className="btn-primary" onClick={ this.goToPartyList }>Join a party</button>
        <button className="btn-primary" onClick={ this.goToCreate }>Create a party</button>
      </div>
    );
  }
});

module.exports = Home;
