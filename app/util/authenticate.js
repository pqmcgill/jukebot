let firebaseUtil = require('./firebaseUtil');

module.exports = {
  requireAuth (nextState, replace) {
    if (!firebaseUtil.isLoggedIn()) {
      replace({ interruptedPath: nextState.location.pathname }, 'welcome');
    }
  },

  requireUnAuth (nextState, replace) {
    if (firebaseUtil.isLoggedIn()) {
      console.log(nextState);
      replace(null, 'home');
    }
  }
};
