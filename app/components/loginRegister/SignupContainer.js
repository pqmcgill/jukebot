const React = require('react');
const Signup = require('./Signup');
const Login = require('./Login');
const Toggle = require('../shared/Toggle');

const firebaseUtil = require('../../util/firebaseUtil');

let SignupContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      credentials: {
        email: '',
        password: '',
      },
      isSignup: false 
    };
  },

  clearAuthValues () {
    this.setState({
      credentials: {
        email: '',
        password: ''
      }
    });
  },

  handleLogin (cb) {
    firebaseUtil.login(this.state.credentials, (err, authData) => {
      if (err) {
        // handle error...
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

  handleSignup () {
    firebaseUtil.signup(this.state.credentials, (err, authData) => {
      if (err) {
        // handle error...
      } else {
        this.context.router.push('/home');
      }
    });
  },

  handleToggle (selected) {
    this.setState({
      isSignup: selected.index === 0 ? false : true
    });
  },

  handleChange (type, val) {
    var credentials = this.state.credentials;
    credentials[type] = val;
    this.setState({
      credentials: credentials
    });
  },

  render () {
    let currentScreen = this.state.isSignup ? 
      <Signup credentials={ this.state.credentials }
        onChange={ this.handleChange }
        onSignup={ this.handleSignup }
      /> :
      <Login credentials={ this.state.credentials }
        onChange={ this.handleChange }
        onLogin={ this.handleLogin }
      />;

    return (
      <div>
        <Toggle options={ ['Login', 'Sign up'] }
          onToggle={ this.handleToggle }
        />
        { currentScreen }
      </div>
    );
  }

}); 

module.exports = SignupContainer;
