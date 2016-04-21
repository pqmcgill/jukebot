var Firebase = require('firebase');

module.exports = function(req, res) {
  

  var partyRef = new Firebase('https://jukebot.firebaseio.com/parties/' + req.body.partyId);
  var userRef = new Firebase('https://jukebot.firebaseio.com/users/' + req.body.uid);

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
        // handle the case where an owner hits this endpoint
      }

      if (members[member]) {
        partySn.child('members').child(member).ref().remove(function() {
          userRef.once('value', function(userSn) {
            var user = userSn.val();

            if (user.currentParty === req.body.partyId) {
              userSn.child('currentParty').ref().remove(function () {
                console.log('resolved');
                res.json({ success: 'woohoo' });
              });
            }

          });
        });
      }

    });
  });
  
}
