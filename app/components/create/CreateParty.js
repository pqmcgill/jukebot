let React = require('react');
let SongSearch = require('../inParty/search/SongSearch');

let rhapsodyUtil = require('../../util/rhapsodyUtil');

let CreateParty = React.createClass({
  //getInitialState () {
  //  return {
  //    verifierCode: null,
  //    partyStarted: false
  //  }
  //},
  //  componentWillMount () {
  //    // grab verifier token from URL
  //    if (window.location.search.match(/^\?code=*/)) { 
  //      console.log('foo');
  //      var query = window.location.search.substring(1);
  //      var vars = query.split('&');
  //      var state = {};
  //      // store code and state params into an object
  //      vars.forEach((v, i) => {
  //        var pair = v.split('=');
  //        if (pair[0] === 'code') { state.code = pair[1]; }
  //        if (pair[0] === 'state') { state.state = pair[1]; }
  //      });
  //      // build a new url
  //      console.log(state);
  //      var { origin, hash } = window.location;
  //      // replace state without query params, but maintain state through
  //      // HTML5 history object
  //      window.history.replaceState(state, '', [origin, hash].join(''));
  //    }
  //  },

//  componentDidMount () {
//    // set code to that in the history object if it exists
//    if (window.history.state) {
//      this.setState({
//        code: window.history.state.code,
//        continueAuth: window.history.state.state === 'continueAuth'
//      });
//    }
//  },

//  componentDidUpdate () {
//    if (this.state.code && this.state.continueAuth) {
//      this.createParty();
//      this.setState({
//        continueAuth: false
//      });
//    } 
//  },



//  // test authenticating with rhapsody and starting player
//  createParty (e) {
//    if (e) { e.preventDefault(); }
//    rhapsodyUtil.authenticate(this.state.code,  (err, res) => {
//      if (err) {
//        console.log('there was an error logging in...', err);
//      } else {
//        console.log('logged in...', res);
//        this.setState({
//          partyStarted: true
//        });
//        firebaseUtil.createParty();
//      }
//    });
//  },

//  // play a track: Tra.5156528 = "Say it ain't so" by Weezer :)

  render () {
    return (
      <div className="component loginSignup">
        <h1>create Party</h1>
        <SongSearch className="search" />
      </div>
    );
  }
});

module.exports = CreateParty;
