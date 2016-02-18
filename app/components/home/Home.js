let React = require('react'),
  firebaseUtil = require('../../util/firebaseUtil'),
  rhapsodyUtil = require('../../util/rhapsodyUtil'),
  { CLIENT_ID } = require('../../util/constants'),
  $ = require('jquery');

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
  },

  handleRhapsodyAuth (err) {
    if (err) {
      console.log('ERROR with RHAPSODY');
      return;
    }

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
    if (rhapsodyUtil.hasTokens()) {
      window.location.href = 'https://api.rhapsody.com/oauth/authorize?client_id=' + CLIENT_ID + '&redirect_uri=http://localhost:3000/home&response_type=code';
    } else {
      rhapsodyUtil.authenticate(null, this.handleRhapsodyAuth);
    }
  },

  render () {
    return (
      <div className="component home">
        <div className="wrapper">
          <a onClick={ this.logout }>logout</a>
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
