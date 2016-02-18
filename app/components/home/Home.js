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
      <div className="component home">
        <div className="wrapper">
          <button className="btn-jumbo" onClick={ this.goToCreate }>
            Start Party
            <img  />
          </button>
          <button className="btn-jumbo" onClick={ this.goToPartyList }>
            Join Party
            <img  />
          </button>
        </div>
      </div>
    );
  }
});

module.exports = Home;
