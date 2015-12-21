var React = require('react');
var Login = require('./Login');
var Main = require('./Main');
var loginStore = require('./stores/loginStore');
var $ = require('jquery');
var Firebase = require('firebase');
require('../vendor/rhapsody');

var App = React.createClass({
  componentWillMount () {
    var code = window.location.search.substring(1).split('=');
    if (!code) { 
      window.location.replace('https://api.rhapsody.com/oauth/authorize?client_id=N2RlOGQ5ODgtNjUzMC00NGIzLTllNjQtMGI2NmRhNjVkNTYx&redirect_uri=http://jukebothero.com&response_type=code');
    } else {
    
      $.post({
        url: 'http://rocky-castle-7896/api/v1/rhapsody/auth',
        data: { code: code },
        dataType: 'json',
        success (data) {
          console.log(data);
        }
      });
    }
  },

  getInitialState () {
    return {
      username: '',
      password: ''
    }
  },

  login () {
    var ref = new Firebase('https://jukebot.firebaseio.com/');
    ref.createUser({
      email: this.state.username,
      password: this.state.password
    }, (err, userData) => {
      if (err) {
        console.log(err);
      } else {
        console.log(userData);
        ref.authWithPassword({
          email: this.state.username,
          password: this.state.password
        }, (err, authData) => {
          console.log(err, authData);
        });
      }

      this.setState({
        username: '',
        password: ''
      });
    });
  },

  changeUsername (e) {
    this.setState({
      username: e.target.value
    });
  }, 

  changePassword (e) {
    this.setState({
      password: e.target.value
    });
  },

  render () {
    return (
      <div>
          <input type="text" val={ this.state.username } onChange={ this.changeUsername } />
          <input type="text" val={ this.state.password } onChange={ this.changePassword } />
          <button onClick={ this.login }>login</button>
        This "This page is under construction" page is under construction.
      </div>
    );
  }
});

module.exports = App;
