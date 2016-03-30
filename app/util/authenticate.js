let firebaseUtil = require('./firebaseUtil');

module.exports = {
  requireAuth (nextState, replace, cb) {
    if (!firebaseUtil.isLoggedIn()) {
      replace({ 
        pathname: 'welcome', 
        state: {
          redirectTo: nextState.location.pathname
        }
      });
      cb();
    }
    
    
      firebaseUtil.getCurrentParty().then((partyId) => {
        console.log('PARTYID', partyId);
        if (partyId) {
          console.log(nextState.location.pathname, nextState.location.pathname.match(/^\/?parties\/.*$/));
          if (!nextState.location.pathname.match(/^\/?parties\/.*$/)) {
            console.log('in here?');
            replace({ pathname: 'parties/' + partyId });
          }
          cb();
        } else {
          nextState.location.state = { noParty: true };
          if (nextState.location.pathname.match(/^\/?parties\/.*$/)) {
            replace({
              pathname: '/home',
              state: { noParty: true }
            });
          }
          cb();
        }
      }, (err) => {
        console.log(err)
        cb(err);
      });
  },

  requireUnAuth (nextState, replace) {
    if (firebaseUtil.isLoggedIn()) {
      replace({ pathname: 'home' });
    }
  }
};
