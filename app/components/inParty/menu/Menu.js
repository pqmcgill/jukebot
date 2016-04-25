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
      <div className="fixed-offset menu">
        { this.context.isOwner ?
          <button className='btn-primary' onClick={ this.context.endParty }>kill party</button> :
          <button className='btn-primary' onClick={ this.context.leaveParty }>leave party</button>
        }
        <button className='btn-primary' onClick={ this.handleLogout }>logout</button>
      </div>
    );
  }
});

module.exports = Menu;
