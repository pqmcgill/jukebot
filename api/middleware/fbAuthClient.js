var Firebase = require('firebase');

// grab the client's auth token from req, and authenticate against firebase.
// if successfull, process the request, otherwise send error response
module.exports = function(req, res, next) {
  console.log('authenticating');
  var ref = new Firebase('https://jukebot.firebaseio.com/');
  var token = req.headers.firebasetoken;
  console.log('token:', token);
  ref.authWithCustomToken(token, function(err, user) {
    if (err) {
      res.json({ error: err });
      return;
    }
    // modify the request body to contain the authorized user id
    req.body.authorizedUser = user.auth.uid;
    ref.unauth();
    console.log('authorizedUser', user.auth.uid);
    next();
  });
}
