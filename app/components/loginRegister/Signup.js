const React = require('react');

const Link = require('react-router').Link;

const Vform = require('../shared/Vform');
const Vinput = require('../shared/Vinput');

let Signup = React.createClass({
  handleSignup (credentials, cb) {
    this.props.onSignup(credentials, (err) => {
      if (err) { 
        console.log(err); 
        switch(err.code) {
          case 'INVALID_USER' || 'INVALID_PASSWORD' || 'INVALID_EMAIL':
            cb({ form: { msg: 'The email or password you\'ve entered is incorrect'}});
            return;
          case 'EMAIL_TAKEN':
            cb({ email: { msg: 'this email is already associated with an account'}});
            return;
          default:
            cb({ form: { msg: 'An unknown error occurred'}});
            return;
        }
      }
    });
  },

  render () {
    return (
      <div>
        <Vform submit={ this.handleSignup } submitBtnTxt="Sign up!">
          <Vinput type="text"
            name="email"
            validation="email"
            placeholder="email"
          />
          <Vinput type="text"
            name="displayName"
            placeholder="display name"
            validation="required"
          />
          <Vinput type="text"
            name="password"
            type="password"
            validation="minCharLen:6"
            placeholder="password"
          />
          <Vinput type="text"
            name="confirm"
            type="password"
            validation="match:password,required"
            placeholder="confirm password"
          />
        </Vform>
        <Link className="link large" to="/login">Already have an account? Sign in</Link>
      </div>
    );
  }
});

module.exports = Signup;
