const React = require('react');
const Link = require('react-router').Link;
const Constants = require('../../config/constants');

const Vform = require('../shared/Vform');
const Vinput = require('../shared/Vinput');

const Login = React.createClass({
  handleLogin (model, cb) {
    this.props.onLogin(model, (err, data) => {
      if (err) {
        console.log(err.code);
        if (err.code === 'INVALID_USER' ||
            err.code === 'INVALID_PASSWORD' ||
            err.code === 'INVALID_EMAIL') {
          cb({ form: { msg: 'The email or password you\'ve entered is incorrect'}});
        }
      } 
    });
  },

  render () {
    return (
      <div>
        <Vform submit={ this.handleLogin } submitBtnTxt="Go!">
          <Vinput type="text" 
            name="email" 
            validation="email"
            required
            placeholder="email" 
          />
          <Vinput type="text" 
            name="password" 
            validation="minCharLen:6"
            required
            placeholder="password"
            type="password"
          /> 
        </Vform>
        <a className="link med">I forgot my login</a>
        <Link className="link large" to="/signup">New User? Create an account</Link>
      </div>
    );
  }
});

module.exports = Login;
