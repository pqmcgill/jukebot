var React = require('react');
var $ = require('jquery');
var firebaseUtil = require('../util/firebaseUtil');
require('../../vendor/rhapsody');

var App = React.createClass({
  getInitialState () {
    return {
      isLoggedIn: firebaseUtil.isLoggedIn()
    }
  },

  componentWillMount () {
    if (!this.state.isLoggedIn) {
      console.log('here');
      this.props.history.push('/welcome');
    } else {
      this.props.history.push('/home');
    }

    firebaseUtil.onChange = this.handleAuthChange;
  },

  handleAuthChange (isLoggedIn) {
    this.setState({
      isLoggedIn: isLoggedIn
    });
  },

  render () {
    return (
      <div>
        Hello world, this is a test
       { this.props.children }
      </div>
    );
  }

});

module.exports = App;
