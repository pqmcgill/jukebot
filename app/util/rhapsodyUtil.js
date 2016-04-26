let $ = require('jquery');
let { CLIENT_ID, REDIRECT } = require('./constants');
let firebaseUtil = require('./firebaseUtil');

let log = (e) => {
  console.log(e, e.data);
};

//Rhapsody.player.on('playEvent', log);
//Rhapsody.player.on('playtimer', log);
//Rhapsody.player.on('error', log);
//Rhapsody.player.on('metadata', log);
//Rhapsody.player.on('queueloaded', log);
//Rhapsody.player.on('queuechanged', log);
//Rhapsody.player.on('authenticated', log);
//Rhapsody.player.on('ready', log);
//Rhapsody.player.on('playsessionexpired', log);
//Rhapsody.player.on('playstopped', log);
//Rhapsody.player.on('playerframeready', log);

module.exports = {
  // allow a component to register callbacks with rhapsody player's events
  registerListener (type, cb) {
    Rhapsody.player.on(type, cb);
  },
  
  getAuthorizationCode (redirect_pathname) {
    // redirect to rhapsody login screen
    // pass redirect url back to UI
    window.location.replace(`https://api.rhapsody.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT + redirect_pathname}&response_type=code&state=continueAuth`);
  },
  
  // login to rhapsody
  login (code, cb) {
    if (code) {
      // get Access token from separate jukebot express application
      $.ajax({
        type: 'POST',
        url: 'https://rocky-castle-7896.herokuapp.com/api/v1/rhapsody/auth',
        headers: {
          firebaseToken: firebaseUtil.getSession().uid,
          "Content-Type": "application/json"
        },
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

  destroyTokens() {
    this.accessToken = localStorage.removeItem('rhapsody.member.accessToken');
    this.refreshToken = localStorage.removeItem('rhapsody.member.refreshToken');
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
  authenticate (code, redirect_pathname, cb) {
    if (redirect_pathname.charAt(0) !== '/') {
      redirect_pathname = '/' + redirect_pathname;
    }
    this.initTokens();

    // setup consumerKey with rhapsody sdk
    if (!this.hasTokens()) {
      if (!code) {
        this.getAuthorizationCode(redirect_pathname);
      } else {
        this.login(code, (err) => {
          if (err) {
            console.log('there was an error logging into rhapsody:', err);
            cb(err);
            return;
          }
          cb(null, true);
        });
      }
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
  playTrack (track_id, seekTime) {
    return new Promise((resolve, reject) => {
      let t = seekTime || 0;
      setTimeout(() => {
        Rhapsody.player.play(track_id);
        var first = true;
        Rhapsody.player.on('playtimer', () => {
          if (first) {
            first = false;
            if (seekTime) {
              Rhapsody.player.seek(seekTime);
            }
            resolve();
          }
        });
      }, 1000);
    });
  },

  pauseTrack () {
    Rhapsody.player.pause();
  },

  destroyPlayer () {
    $('#player-frame').remove();
  }

};
