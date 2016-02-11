let firebaseUtil = require('./firebaseUtil');

module.exports = {
  requireAuth (nextState, replace) {
    console.log(nextState.location.pathname);
    if (!firebaseUtil.isLoggedIn()) {
      console.log(nextState.location.pathname);
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
