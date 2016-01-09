const React = require('react');
const Signup = require('./Signup');
const Login = require('./Login');
const Toggle = require('./Toggle');

const SignupContainer = React.createClass({
  propTypes: {
    authenticate: React.PropTypes.func,
    register: React.PropTypes.func
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
    this.props.authenticate(this.state.credentials, (err) => {
      if (err) { 
        cb(err); 
      } else {
        this.clearAuthValues();
      }
    });
  },

  handleSignup () {
    this.props.register(this.state.credentials, (err) => {
      if (err) {
        cb(err);
      } else {
        this.clearAuthValues();
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
