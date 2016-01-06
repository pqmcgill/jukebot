const React = require('react');

const Signup = React.createClass({
  propTypes: {
    credentials: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      credentials: {
        email: '',
        pwd: ''
      }
    };
  },

  getInitialState () {
    return {
      credentials: this.props.credentials
    };
  },

  handleSignup () {
  
  },

  render () {
    return (
      <div>
        <h3>Signup</h3>
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
        <button onClick={ this.handleSignup }>Sign up</button>
      </div>
    );
  }
});

module.exports = Signup;
