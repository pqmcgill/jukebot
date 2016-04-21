let React = require('react');

let Menu = React.createClass({
  contextTypes: {
    leaveParty: React.PropTypes.func,
    logout: React.PropTypes.func
  },

  render () {
    return (
      <div className="fixed-offset">
        <button onClick={ this.context.leaveParty }>leaveParty</button>
        <button onClick={ this.context.logout }>logout</button>
      </div>
    );
  }
});

module.exports = Menu;
