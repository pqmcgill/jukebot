const React = require('react');
const firebaseUtil = require('../../util/firebaseUtil');

const Login = require('./Login'),
  Signup = require('./Signup'),
  ForgotLogin = require('./ForgotLogin');

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
        this.loginSignupSuccess();
      }
    });
  },

  handleSignup (credentials, cb) {
    firebaseUtil.signup(credentials, (err, authData) => {
      if (err) {
        // handle error...
        cb(err);
      } else {
        this.loginSignupSuccess();
      }
    });
  },

  // check if user got redirected due to unauthenticated call
  // if so, then redirect to intended state
  loginSignupSuccess () {
    let redirect = '/home';
    if (this.props.location.state && this.props.location.state.redirectTo) {
      redirect = this.props.location.state.redirectTo;
    }
    this.context.router.push(redirect);
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

  test () {
    this.context.router.push('/forgot');
  },

  render () {
    
    // Determine the child w/ props to render based on the route
    let child;
    console.log('location pathname: ', this.props.location.pathname);
    switch(this.props.location.pathname) {
      case 'login':
        child = <Login onLogin={ this.handleLogin } />;
        break;
      case 'signup':
        child = <Signup onSignup={ this.handleSignup } />;
        break;
      case 'forgot':
        child = <ForgotLogin generateEmail={ this.handleGenerateEmail } updateUser={ this.handleUpdateUser } />;
        break;
      default:
        child = <Login onLogin={ this.handleLogin } />;
    }

    return (
      <div className="component loginSignup">
        <img className="logo" src={ logo } alt="JUKEBOT" />
        { child }
      </div>
    );
  }

}); 

module.exports = SignupContainer;
