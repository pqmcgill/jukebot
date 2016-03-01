let React = require('react');
let firebaseUtil = require('../../util/firebaseUtil');

let GenerateEmail = require('./GenerateEmail'),
  UpdateUser = require('./UpdateUser');

let ForgotLogin = React.createClass({
  propTypes: {
    generateEmail: React.PropTypes.func,
    updateUser: React.PropTypes.func
  },

  getInitialState () {
    return {
      emailGenerated: false
    };
  },

  handleGenerateEmail (model) {
    this.props.generateEmail(model, (err) => {
      if (err) {
        console.log('error...', err);
        return;
      }
      this.setState({
        emailGenerated: true
      });
    });
  },

  render () {
    return (
      <div>
        { 
          !this.state.emailGenerated ?
          <GenerateEmail generateEmail={ this.handleGenerateEmail }/> :
          <UpdateUser create={ this.props.updateUser }/>
        }
      </div>
    );
  }
});

module.exports = ForgotLogin;
