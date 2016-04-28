let React = require('react'),
  ReactDOM = require('react-dom'),
  Overlay = require('../shared/Overlay'),
  Spinner = require('../shared/Spinner'),
  firebaseUtil = require('../../util/firebaseUtil'),
  rhapsodyUtil = require('../../util/rhapsodyUtil'),
  { CLIENT_ID } = require('../../util/constants'),
  { generateMouseEventRipple } = require('../../util/rippleGenerator'),
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

  getInitialState () {
    return {
      authenticating: false
    };
  },

  componentWillMount () {
    let code = this.props.location.query.code;
    if (code) {
      this.setState({
        authenticating: true
      }, () => {
        rhapsodyUtil.authenticate(code, this.props.location.pathname, this.handleRhapsodyAuth);
      });
    }
  },

  handleRhapsodyAuth (err) {
    if (err) {
      console.log('ERROR with RHAPSODY');
      this.setState({
        authenticating: true
      });
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
  goToPartyList (e) {
    generateMouseEventRipple(document.getElementById('join'), e, {
      timeout: 1000,
      rippleSpeed: 'slow'
    }, () => {
      this.context.router.push('/parties');
    });
  },

  // navigate to the party creation page
  goToCreate (e) {
    let { pathname } = this.props.location;
    if (pathname[0] !== '/') {
      pathname = '/' + pathname;
    }
    generateMouseEventRipple(document.getElementById('create'), e, {
      timeout: 500,
      rippleSpeed: 'slow'
    }, () => {
      rhapsodyUtil.authenticate(null, pathname, this.handleRhapsodyAuth);
    });
  },

  render () {
    return (
      <div className="component home no-padding">
        <div className="wrapper">
          <a className="logout" onClick={ this.logout }>logout</a>
          <button id="create" className="btn-jumbo link ripple ripple-medium" onClick={ this.goToCreate }>
            <img src={ start_img }/>
            <p className="party-text">a party</p>
          </button>
          <button id="join" className="btn-jumbo link ripple ripple-medium" onClick={ this.goToPartyList }>
            <img src={ join_img }/>
            <p className="party-text">a party</p>
          </button>
        </div>
        <Overlay visible={ this.state.authenticating }>
          <Spinner className="loading-spinner" />
        </Overlay>
      </div>
    );
  }
});

module.exports = Home;
