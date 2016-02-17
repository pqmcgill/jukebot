const React = require('react');
const firebaseUtil = require('../../util/firebaseUtil');

let logo = require('../../images/jukebot.png');

let SignupContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleLogin (credentials, cb) {
    firebaseUtil.login(credentials, (err, authData) => {
      if (err) {
        // handle error...
        cb(err);
      } else {
        let redirect = '/home';

        // check if user got redirected due to unauthenticated call
        // if so, then redirect to intended state
        if (this.props.location.state && this.props.location.state.redirectTo) {
          redirect = this.props.location.state.redirectTo;
        }
        this.context.router.push(redirect);
      }
    });
  },

  handleSignup (credentials, cb) {
    firebaseUtil.signup(credentials, (err, authData) => {
      if (err) {
        // handle error...
        cb(err);
      } else {
        this.context.router.push('/home');
      }
    });
  },

  render () {
    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        onLogin: this.handleLogin,
        onSignup: this.handleSignup
      });
    });
    return (
      <div className="component loginSignup">
        <img className="logo" src={ logo } alt="JUKEBOT" />
        { children }
      </div>
    );
  }

}); 

module.exports = SignupContainer;
