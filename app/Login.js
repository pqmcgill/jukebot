const React = require('react');
const rhapsody = require('./services/Rhapsody');
const Login = React.createClass({
  authenticateWithRhapsody () {
    window.location.replace(
      `https://api.rhapsody.com/oauth/authorize?client_id=${rhapsody.apiKey}&redirect_uri=localhost:8080&response_type=code`
    );
  },

  render () {
    return (
      <div>
        <button onClick={this.authenticateWithRhapsody}>Sign in with Rhapsody</button>
      </div>
    );
  }
});

module.exports = Login;
