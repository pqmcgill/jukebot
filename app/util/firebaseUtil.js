let Firebase = require('firebase');

let forge = 'https://jukebot.firebaseio.com';
let ref = new Firebase(forge);
let session;

let setSession = () => {
  session = ref.getAuth();
};

setSession();

// Private Methods
let addNewUser = (user, cb) => {
  ref.child('users').child(user.uid).set(user, () => {
    cb();
  });
};

// Public Interface
let firebaseUtil = {
  isLoggedIn () {
    return session ? true : false;
  },

  getSession () {
    return session;
  },

  login (credentials, cb) {
    ref.authWithPassword(credentials, (err, authData) => {
      if (err) {
        cb(err);
      } else {
        setSession();
        this.onChange(this.isLoggedIn());
        cb(null, authData);
      }
    });
  },

  signup (credentials, cb) {
    ref.createUser(credentials, (err) => {
      if (err) {
        console.log('An Error occurred during signup:', err);
        cb(err);
      } else {
        this.login(credentials, (err, authData) => {
          if (err) {
            cb(err);
          } else {
            addNewUser({
              email: credentials.email,
              uid: authData.uid,
              displayName: credentials.displayName
            }, () => {
              setSession();
              cb(null, authData);
            });
          }
        });
      }
    });
  },

  logout () {
    ref.unauth();
    session = null;
    firebaseUtil.onChange(this.isLoggedIn());
  },

  requestTempToken (email, cb) {
    ref.resetPassword({
      email: email
    }, (err) => {
      cb(err);
    });
  },

  changePassword (email, oldPwd, newPwd, cb) {
    ref.changePassword({
      email: email,
      oldPassword: oldPwd,
      newPassword: newPwd
    }, (err) => {
      cb(err);
    });
  },
  
  getCurrentParty () {
    return new Promise((resolve, reject) => {
      if (!session) {
        reject({ error: 'unauthenticated' });
      } else {
        let ref = new Firebase('https://jukebot.firebaseio.com/users/' + session.uid);
        ref.once('value', function(sn) {
          resolve(sn.val().currentParty); 
        });
      }
    });
  }

};

module.exports = firebaseUtil;
