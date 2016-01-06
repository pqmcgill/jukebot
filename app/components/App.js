var React = require('react');
var $ = require('jquery');
var Firebase = require('firebase');
require('../../vendor/rhapsody');

var userRef;

var App = React.createClass({

  getInitialState () {
    return {
      auth: null
    }
  },

  componentDidMount () {
    userRef = new Firebase('https://jukebot.firebaseio.com');
    this.setState({
      auth: userRef.getAuth()
    });
  },

  login (credentials, cb) {
    userRef.authWithPassword(credentials, (err, auth) => {
      if (err) {
        cb(err);
        return; 
      }
      // else authorized
    });
  },

  render () {
    // Add properties to rendered children
    let childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { login: this.login });
    });

    return (
      <div>
       { childrenWithProps }
      </div>
    );
  }

});

module.exports = App;
