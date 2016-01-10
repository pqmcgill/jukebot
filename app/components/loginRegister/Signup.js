const React = require('react');

const Signup = React.createClass({
  propTypes: {
    credentials: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    onSignup: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      credentials: {
        email: '',
        password: ''
      }
    };
  },

  handleSignup () {
    this.props.onSignup((err) => {
      if (err) { console.log(err); }
    });
  },

  handleChange (e) {
    this.props.onChange(
      e.target.getAttribute('name'),
      e.target.value
    );
  },

  render () {
    return (
      <div>
        <h3>Signup</h3>
        <input type="text"
          name="email"
          placeholder="email"
          onChange={ this.handleChange }
          value={ this.props.credentials.email }
        />
        <input type="text"
          name="password"
          placeholder="password"
          onChange={ this.handleChange }
          value={ this.props.credentials.password }
        />
        <button onClick={ this.handleSignup }>Sign up</button>
      </div>
    );
  }
});

module.exports = Signup;
