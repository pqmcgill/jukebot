const React = require('react');
const Constants = require('../config/constants');

const Login = React.createClass({
  getInitialState () {
    return {
      username: '',
      password: ''
    };
  },

  componentDidMount () {
    console.log('mounted!');
  },

  handleChange (e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  },

  handleLogin () {

    var success = this.props.login({
      email: this.state.email,
      password: this.state.password
    }, 

    (err, authData) => {
      if (err) {
        switch (err.code) {
          case Constants.firebase.errors.invalidUser:
            // handle invalid user...
            break;
          case Constants.firebase.errors.invalidEmail:
            // handle invalid email...
            break;
          default:
            // handle unknown error...
            break;
          return;
        }
      }


    });
  },

  render () {
    return (
      <div>

        <h3>Login</h3>

        <input type="text" 
          name="email" 
          placeholder="email" 
          onChange={ this.handleChange }
        />
        <input type="text" 
          name="password" 
          placeholder="password"
          onChange={ this.handleChange }
        />

        <button onClick={ this.handleLogin }>Login</button>

      </div>
    );
  }
});

module.exports = Login;
