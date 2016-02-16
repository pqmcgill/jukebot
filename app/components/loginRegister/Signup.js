const React = require('react');

const Link = require('react-router').Link;

const Vform = require('../shared/Vform');
const Vinput = require('../shared/Vinput');

let Signup = React.createClass({
  handleSignup (credentials, cb) {
    this.props.onSignup(credentials, (err) => {
      if (err) { 
        console.log(err); 
        cb(err);
      }
    });
  },

  render () {
    return (
      <div>
        <Vform submit={ this.handleSignup } submitBtnTxt="Sign up!">
          <Vinput type="text"
            name="email"
            required
            validation="email"
            placeholder="email"
          />
          <Vinput type="text"
            name="password"
            type="password"
            required
            validation="minCharLen:6"
            placeholder="password"
          />
        </Vform>
        <Link className="link large" to="/login">Already have an account? Sign in</Link>
      </div>
    );
  }
});

module.exports = Signup;
