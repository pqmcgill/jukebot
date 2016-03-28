var Firebase = require('firebase');

module.exports = function(req, res) {
  var ref = new Firebase('https://jukebot.firebaseio.com/parties');
  console.log(req.body.authorizedUser);
  
  // first authenticate as super user 
  ref.authWithCustomToken(process.env.APP_SECRET, function(err) {
    if (err) { res.json({ error: err }); }
    
    // create new data, and generate reference to it
    var members = {};
    // set to zero to match the party's partyBit
    members[req.body.uid] = 0;
    var partyData = {
      // Add metaData object
      metaData: {
        displayName: req.body.displayName,
        owner: req.body.uid
      },
      // Add membership object
      members: members,
      pwd: req.body.pwd,
      // used for music selection algorithm
      partyBit: 0
    };
    
    // push partyData 
    var newRef = ref.push(partyData, function(err) {
      if (err) { res.json({ error: err }); }
    });

    newRef.once('value', function(sn) {
      var userRef = new Firebase('https://jukebot.firebaseio.com/users/' + req.body.uid);
      userRef.update({
        currentParty: sn.key()
      }, function(err) {
        
        // TODO: if nested error occurs then undo previous operations
        if (err) { res.json({ error: err }); }

        // resolve the new key
        newRef.once('value', function(sn) {
          res.json({ key: sn.key() });
        });
      });
    });

  });
};
