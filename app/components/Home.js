let React = require('react'),
  firebaseUtil = require('../util/firebaseUtil');

let Home = React.createClass({

  logout (e) {
    e.preventDefault();
    firebaseUtil.logout();
    console.log(this.props.history);
    this.props.history.replace('/welcome');
  },

  render () {
    return (
      <div>
        <h1>Home</h1>
        <button onClick={ this.logout }>logout</button>
      </div>
    );
  }

});

module.exports = Home;
