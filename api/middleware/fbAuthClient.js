var Firebase = require('firebase');

// grab the client's auth token from req, and authenticate against firebase.
// if successfull, process the request, otherwise send error response
module.exports = function(req, res, next) {
  var ref = new Firebase('https://jukebot.firebaseio.com/');
  var token = req.headers.firebasetoken;

  ref.authWithCustomToken(token, function(err) {
    if (err) {
      res.json({ error: err });
      return;
    }
    ref.unauth();
    next();
  });
}
