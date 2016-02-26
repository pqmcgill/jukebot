const React = require('react');
const firebaseUtil = require('../../util/firebaseUtil');

let logo = require('../../images/jukebot.png');

let SignupContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return { email: null };
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
  
  handleGenerateEmail (request, cb) {
    firebaseUtil.requestTempToken(request.email, (err) => {
      cb(err);
      this.setState({ email: request.email });
    });
  },
  
  handleUpdateUser (request) {
    firebaseUtil.changePassword(this.state.email, request.token, request.newPassword, (err) => {
      if (err) {
        console.log('error...', err);
        return;
      }
      firebaseUtil.login({
        email: this.state.email,
        password: request.newPassword
      }, (err) => {
        if (err) {
          console.log('error...', err);
          return;
        }
        this.context.router.push('/home');
      });
    });
  },

  render () {
    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        onLogin: this.handleLogin,
        onSignup: this.handleSignup,
        generateEmail: this.handleGenerateEmail,
        updateUser: this.handleUpdateUser
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
