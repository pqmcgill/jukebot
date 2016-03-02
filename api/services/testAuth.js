var Firebase = require('firebase');

// A test for passing firebase auth variables to backend
module.exports = function(req, res) {
  var ref = new Firebase('http://jukebot.firebaseio.com');
  ref.authWithCustomToken('tLSZF2uAC2zs6fyHmeh4NWXCGbjLgu8fBQhhJ7qO', function(err) {
    if (err) {
      console.log(err);
      return;
    }
    ref.once('value', function(sn) {
      res.json(sn.val());
    });
    ref.unauth();
  });
};
