let Firebase = require('firebase');

let forge = 'https://jukebot.firebaseio.com';
let ref = new Firebase(forge);
let session = ref.getAuth();
console.log(session);

// Private Methods
let addNewUser = (user) => {
  ref.child('users').child(user.uid).set(user);
};

// Public Interface
let firebaseUtil = {
  isLoggedIn () {
    return session ? true : false;
  },

  login (credentials, cb) {
    ref.authWithPassword(credentials, (err, authData) => {
      if (err) {
        console.log('An Error occurred during login:', err);
        cb(err);
      } else {
        session = authData;
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
              uid: authData.uid
            });
            cb(null, authData);
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

  createParty () {
    console.log(session.uid);
    ref.child('parties').push().set({
      owner: session.uid,
      pwd: 'test',
      displayName: '90\'s night jamboree!'
    });
  }

};

module.exports = firebaseUtil;
