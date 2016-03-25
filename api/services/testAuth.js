var Firebase = require('firebase');

// A test for passing firebase auth variables to backend
module.exports = function(req, res) {
  console.log(process.env.APP_SECRET);
  var ref = new Firebase('http://jukebot.firebaseio.com');
  ref.authWithCustomToken(process.env.APP_SECRET, function(err) {
    if (err) {
      res.json(err);
    }
    // return the entire snapshot
    ref.once('value', function(sn) {
      res.json(sn.val());
    });
    ref.unauth();
  });
};
