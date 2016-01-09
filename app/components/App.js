var React = require('react');
var $ = require('jquery');
var Firebase = require('firebase');
require('../../vendor/rhapsody');

var App = React.createClass({

  getInitialState () {
    return {
      auth: null,
    }
  },

  componentWillMount () {
    this.userRef = new Firebase('https://jukebot.firebaseio.com');
    this.setState({
      auth: this.userRef.getAuth()
    });
  },

  componentWillUnmount () {
    this.userRef.off();
  },

  componentDidUpdate () {
    console.log(this.state);
    if (this.state.auth) {
      this.routeToHome();
    }
  },

  routeToHome () {
    console.log('routing to home page...');
  },

  assignAuth (auth) {
    this.setState({
      auth: auth
    });
  },

  login (credentials, cb) {
    console.log(credentials);
    this.userRef.authWithPassword(credentials, (err, userAuth) => {
      if (err) {
        switch (err.code) {
          case 'INVALID_EMAIL':
            console.log('the email is invalid');
            break;
          case 'INVALID_PASSWORD':
            console.log('the password is invalid');
            break;
          default:
            console.log('an unexpected error has occurred:', err);
        }
      } else {
        this.assignAuth(userAuth);
      }
    });
  },

  createUser (auth) {
    
  },

  signup (credentials, cb) {
    this.userRef.createUser(credentials, (err, userData) => {
      if (err) {
        switch (err.code) {
          case 'EMAIL_TAKEN':
            console.log('the email is already in use');
            break;
          case 'INVALID_EMAIL':
            console.log('the email is invalid');
            break;
          default:
            console.log('there was an unexpected error create the user:', err);
        }
      } else {
        console.log('user successfully created', userData);
      }
    });
  },

  render () {
    // Add properties to rendered children
    let childrenWithProps = React.Children.map(this.props.children, (child) => {
      switch (child.type.displayName) {
        case 'SignupContainer':
          return React.cloneElement(child, { 
            authenticate: this.login,
            register: this.signup 
          });
        default:
          return React.cloneElement(child, {});
      }
    });

    return (
      <div>
       { childrenWithProps }
      </div>
    );
  }

});

module.exports = App;
