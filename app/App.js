var React = require('react');
var Login = require('./Login');
var Main = require('./Main');
var loginStore = require('./stores/loginStore');
var $ = require('jquery');
var Firebase = require('firebase');
require('../vendor/rhapsody');

var App = React.createClass({
  getInitialState () {
    return {
      username: '',
      password: ''
    }
  },

  login () {
    
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


  render () {
    return (
      <div>
          <button onClick={ this.login }>login</button>
        This "This page is under construction" page is under construction.
      </div>
    );
  }
});

module.exports = App;