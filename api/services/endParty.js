var Firebase = require('firebase');

module.exports = function(req, res) {

  var partyRef = new Firebase('https://jukebot.firebaseio.com/parties/' + req.body.partyId);
  var userRef = new Firebase('https://jukebot.firebaseio.com/users/' + req.body.uid);
  var usersRef = new Firebase('https://jukebot.firebaseio.com/users');

  // authenticate
  userRef.authWithCustomToken(process.env.APP_SECRET, function(err) {
    if (err) { res.json({ error: err }); }
    
    // query party
    partyRef.once('value', function(partySn) {
      var partyVal = partySn.val();
      var owner = partyVal.metaData.owner;
      var members = partyVal.members;
      var member = req.body.uid;

      if (member === owner) {
        usersRef.orderByChild('currentParty').equalTo(req.body.partyId).once('value', function(usersSn) {
          usersSn.forEach(function(userSn) {
            userSn.child('currentParty').ref().remove();
          });

          partyRef.remove(function() {
            res.json({ success: 'party killed'});
          });
        });
      } else {
        res.json({ err: 'only party owners can end a party' });
      }

    });
  });
  
};
