let React = require('react');

let Menu = React.createClass({
  contextTypes: {
    leaveParty: React.PropTypes.func,
    logout: React.PropTypes.func,
    logoutAndEndParty: React.PropTypes.func,
    isOwner: React.PropTypes.bool,
    endParty: React.PropTypes.func
  },

  handleLogout () {
    this.context.isOwner ?
      this.context.logoutAndEndParty() :
      this.context.logout();
  },

  render () {
    return (
      <div className="fixed-offset">
        { this.context.isOwner ?
          <button onClick={ this.context.endParty }>kill party</button> :
          <button onClick={ this.context.leaveParty }>leave party</button>
        }
        <button onClick={ this.handleLogout }>logout</button>
      </div>
    );
  }
});

module.exports = Menu;
