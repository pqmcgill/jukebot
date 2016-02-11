let firebaseUtil = require('./firebaseUtil');

module.exports = {
  requireAuth (nextState, replace) {
    if (!firebaseUtil.isLoggedIn()) {
      console.log(nextState);
      replace({ 
        pathname: 'welcome', 
        state: {
          redirectTo: nextState.location.pathname
        }
      });
    }
  },

  requireUnAuth (nextState, replace) {
    if (firebaseUtil.isLoggedIn()) {
      console.log(nextState);
      replace({ pathname: 'home' });
    }
  }
};
