let $ = require('jquery');
let { CLIENT_ID } = require('./constants');
let firebaseUtil = require('./firebaseUtil');

let log = (e) => {
  console.log(e, e.data);
};

Rhapsody.player.on('playEvent', log);
Rhapsody.player.on('playtimer', log);
Rhapsody.player.on('error', log);
Rhapsody.player.on('metadata', log);
Rhapsody.player.on('queueloaded', log);
Rhapsody.player.on('queuechanged', log);
Rhapsody.player.on('authenticated', log);
Rhapsody.player.on('ready', log);
Rhapsody.player.on('playsessionexpired', log);
Rhapsody.player.on('playstopped', log);
Rhapsody.player.on('playerframeready', log);

module.exports = {
  // allow a component to register callbacks with rhapsody player's events
  registerListener (type, cb) {
    Rhapsody.player.on(type, cb);
  },
  
  // login to rhapsody
  login (code, cb) {
    
    if (!code) { 
      // redirect to rhapsody login screen
      // pass redirect url back to UI
      window.location.replace(`https://api.rhapsody.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/home&response_type=code&state=continueAuth`);
    } else {
      // get Access token from separate jukebot express application
      $.ajax({
        type: 'POST',
        url: 'http://rocky-castle-7896.herokuapp.com/api/v1/rhapsody/auth',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          code: code
        }),
        success: (res) => {
          res = JSON.parse(res);
          this.setTokens(res.access_token, res.refresh_token);
          if (cb) {
            cb();
          }
        },
        error: (err) => {
          if (cb) {
            cb(err);
          }
        }
      });
    }
  },

  // get any cached tokens
  initTokens() {
    this.accessToken = localStorage.getItem('rhapsody.member.accessToken');
    this.refreshToken = localStorage.getItem('rhapsody.member.refreshToken');
  },

  // return a boolean corresponding to the status of whether any tokens
  // have been initialized
  hasTokens() {
    return this.accessToken && this.refreshToken;
  },

  // delete any cached and local token references
  clearTokens() {
    localStorage.removeItem('rhapsody.member.accessToken');
    localStorage.removeItem('rhapsody.member.refreshToken');
    delete this.accessToken;
    delete this.refreshToken;
  },

  // save tokens on localStorage, then initialize them
  setTokens(accessToken, refreshToken) {
    localStorage.setItem('rhapsody.member.accessToken', accessToken);
    localStorage.setItem('rhapsody.member.refreshToken', refreshToken);
    this.initTokens();
  },

  // public method. Acts as rhapsody authentication controller
  authenticate (code, cb) {
    this.initTokens();

    // setup consumerKey with rhapsody sdk
    if (!this.hasTokens()) {
      console.log('no tokens');
      this.login(code, (err) => {
        if (err) {
          console.log('there was an error logging into rhapsody:', err);
          cb(err);
          return;
        }

        cb(null, true);
      });
    } else {
      // call final callback upon completion
      cb(null, true);
    }
  },

  // initialize rhapsody player
  init (cb) {
      Rhapsody.init({
        consumerKey: CLIENT_ID,
        version: 'v1',
        catalog: 'EN'
      });

      // callback after initialization is complete
      Rhapsody.player.on('ready', () => {
        this.setPlayer(this.accessToken, this.refreshToken, () => {
          cb(null, true);
        });
      });
  },

  // connect to player via auth credentials
  setPlayer (access_token, refresh_token, cb) {
    Rhapsody.member.set({
      accessToken: access_token,
      refreshToken: refresh_token
    });

    cb();
  },

  // play a track by a given id
  playTrack (track_id) {
    Rhapsody.player.play(track_id);
  }

};
