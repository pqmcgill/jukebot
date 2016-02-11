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
    console.log(this.props.history);
    this.props.history.replace('/welcome');
  },

  // navigate to the list of available parties
  goToPartyList () {
    console.log(this.context);
    this.props.router.push('/parties');
  },

  // navigate to the party creation page
  goToCreate () {
    this.props.router.push('/create');
  },

  render () {
    return (
      <div>
        <button onClick={ this.logout }>logout</button>
        <h1>Home</h1>
        <button onClick={ this.goToPartyList }>Join a party</button>
        <button onClick={ this.goToCreate }>Create a party</button>
      </div>
    );
  }
});

module.exports = Home;
