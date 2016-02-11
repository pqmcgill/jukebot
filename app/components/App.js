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
       { this.props.children }
      </div>
    );
  }

});

module.exports = App;
