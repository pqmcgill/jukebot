const React = require('react');
const Constants = require('../../config/constants');

const Login = React.createClass({
  PropTypes: {
    onChange: React.PropTypes.func.isRequired,
    onLogin: React.PropTypes.func.isRequired,
    credentials: React.PropTypes.obj
  },

  getDefaultProps () {
    return {
      credentials: {
        email: '',
        password: ''
      }
    };
  },

  handleChange (e) {
    this.props.onChange(e.target.getAttribute('name'), e.target.value);
  },

  handleLogin () {
    this.props.onLogin((err) => {
      if (err) {
        console.log(err);
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
          value={ this.props.credentials.email }
          onChange={ this.handleChange }
        />
        <input type="text" 
          name="password" 
          placeholder="password"
          value={ this.props.credentials.password }
          onChange={ this.handleChange }
        />

        <button onClick={ this.handleLogin }>Login</button>

      </div>
    );
  }
});

module.exports = Login;
