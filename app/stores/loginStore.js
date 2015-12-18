var auth = false;

module.exports = {
  setAuthCode (code) {
    auth = code;
  },

  getAuthCode () {
    return auth;
  },

  isAuth () {
    return auth ? true : false;
  }
};
