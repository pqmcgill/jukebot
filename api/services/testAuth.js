var Firebase = require('firebase');

// A test for passing firebase auth variables to backend
module.exports = function(req, res) {
  var ref = new Firebase('http://jukebot.firebaseio.com');
  ref.authWithCustomToken(process.env.APP_SECRET, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    // return the entire snapshot
    ref.once('value', function(sn) {
      res.json(sn.val());
    });
    ref.unauth();
  });
};
