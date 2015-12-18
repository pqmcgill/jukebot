var React = require('react');
var Login = require('./Login');
var Main = require('./Main');
var loginStore = require('./stores/loginStore');
var $ = require('jquery');
require('../vendor/rhapsody');

var App = React.createClass({
  componentWillMount () {

    Rhapsody.init({
      consumerKey: 'NTYyNTRlYjYtMGRiMS00ODcwLWE1NDMtZmY4OTE4MTAxNGE4'
    });

    var query = window.location.search.substring(1);
    var pair = query.split('=');
    if (pair[0] === 'code') {
      loginStore.setAuthCode(pair[0]);
      $.get(
        `localhost:9000/api?code=${pair[1]}`, 
        function (data) {
          Rhapsody.member.set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
          });
        });
    }
  },

  render () {
    debugger;
    return (
      <div>
        This "This page is under construction" page is under construction.
      </div>
    );
  }
});

module.exports = App;
