const React = require('react');
const Signup = require('./Signup');
const Login = require('./Login');
const Toggle = require('./Toggle');

const SignupContainer = React.createClass({

  getInitialState () {
    return {
      auth: {
        email: '',
        pwd: '',
      },
      isSignup: false 
    };
  },

  handleLogin () {
    this.props.authenticate({
      email: this.state.email,
      pwd: this.state.pwd
    });
  },

  handleToggle (selected) {
    console.log(selected.index === 0 ? false : true);
    this.setState({
      isSignup: selected.index === 0 ? false : true
    });
  },

  render () {
    let currentScreen = this.state.isSignup ? 
      <Signup credentials={ this.state.auth }/> :
      <Login credentials={ this.state.auth }/>;

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
