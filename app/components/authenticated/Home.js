let React = require('react'),
  firebaseUtil = require('../../util/firebaseUtil'),
  rhapsodyUtil = require('../../util/rhapsodyUtil');

let Home = React.createClass({
  getInitialState () {
    return {
      verifierCode: null
    }
  },

  componentWillMount () {
    // grab verifier token from URL
    if (window.location.search.match(/^\?code=*/)) { 
      console.log('foo');
      var query = window.location.search.substring(1);
      var vars = query.split('&');
      var state = {};
      // store code and state params into an object
      vars.forEach((v, i) => {
        var pair = v.split('=');
        if (pair[0] === 'code') { state.code = pair[1]; }
        if (pair[0] === 'state') { state.state = pair[1]; }
      });
      // build a new url
      console.log(state);
      var { origin, hash } = window.location;
      // replace state without query params, but maintain state through
      // HTML5 history object
      window.history.replaceState(state, '', [origin, hash].join(''));
    }
  },

  componentDidMount () {
    // set code to that in the history object if it exists
    if (window.history.state) {
      this.setState({
        code: window.history.state.code,
        continueAuth: window.history.state.state === 'continueAuth'
      });
    }
  },

  componentDidUpdate () {
    if (this.state.code && this.state.continueAuth) {
      this.createParty();
      this.setState({
        continueAuth: false
      });
    } 
  },

  // handle loggin out of firebase and rhapsody
  logout (e) {
    e.preventDefault();
    rhapsodyUtil.clearTokens();
    firebaseUtil.logout();
    console.log(this.props.history);
    this.props.history.replace('/welcome');
  },

  // test authenticating with rhapsody and starting player
  createParty (e) {
    console.log('here');
    if (e) { e.preventDefault(); }
    rhapsodyUtil.authenticate(this.state.code,  (err, res) => {
      if (err) {
        console.log('there was an error logging in...', err);
      } else {
        console.log('logged in...', res);
      }
    });
  },

  // play a track: Tra.5156528 = "Say it ain't so" by Weezer :)
  playTrack (e) {
    e.preventDefault();
    rhapsodyUtil.playTrack('Tra.5156528');
  },

  render () {
    return (
      <div>
        <h1>Home</h1>
        <button onClick={ this.logout }>logout</button>
        <button onClick={ this.createParty }>Create Party</button>
        <button onClick={ this.playTrack }>Say it ain't so</button>
      </div>
    );
  }

});

module.exports = Home;
