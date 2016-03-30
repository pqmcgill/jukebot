var Firebase = require('firebase');

module.exports = function(req, res) {
  

  var partyRef = new Firebase('https://jukebot.firebaseio.com/parties/' + req.body.partyId);
  var userRef = new Firebase('https://jukebot.firebaseio.com/users/' + req.body.memberUid);

  // authenticate
  userRef.authWithCustomToken(process.env.APP_SECRET, function(err) {
    if (err) { res.json({ error: err }); }

    // query party
    partyRef.once('value', function(partySn) {



    });
  });
  
}
