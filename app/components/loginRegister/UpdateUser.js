let React = require('react');

let Vform = require('../shared/Vform'),
  Vinput = require('../shared/Vinput');

let UpdateUser = React.createClass({
  propTypes: {
    create: React.PropTypes.func.isRequired
  },

  render () {
    return (
      <div>
        <Vform submit={ this.props.create } submitBtnTxt="Login">
          <Vinput name="token"
            placeholder="temporary password"
            validation="required"
            type="password"
          />
          <Vinput name="newPassword"
            placeholder="new password"
            validation="minCharLen:6"
            type="password"
          />
          <Vinput name="confirm"
            placeholder="confirm new password"
            validation="match:newPassword"
            type="password"
          />
        </Vform>
      </div>
    );
  }
});

module.exports = UpdateUser;
