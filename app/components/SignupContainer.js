const React = require('react');
const Signup = require('./Signup');
const Login = require('./Login');
const Toggle = require('./Toggle');

const firebaseUtil = require('../util/firebaseUtil');

const SignupContainer = React.createClass({

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
        const { location } = this.props;
        if (location.state && location.state.interruptedPath) {
          console.log('resuming');
          this.props.history.replaceState(null, location.state.interruptedPath);
        } else { 
          this.props.history.pushState(null, '/home');
        }
      }
    });
  },

  handleSignup () {
    firebaseUtil.signup(this.state.credentials, (err, authData) => {
      if (err) {
        // handle error...
      } else {
        this.props.history.pushState(null, '/home');
      }
    });
  },

  handleToggle (selected) {
    console.log(selected.index === 0 ? false : true);
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
