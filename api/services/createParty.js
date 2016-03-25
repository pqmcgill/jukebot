var Firebase = require('firebase');

module.exports = function(req, res) {
  var ref = new Firebase('https://jukebot.firebaseio.com/parties');
  
  // first authenticate as super user 
  ref.authWithCustomToken(process.env.APP_SECRET, function(err) {
    console.log(req.body);
    if (err) { res.json({ error: err }); }
    
    // create new data, and generate reference to it
    var member = { partyBit: 0 };
    var members = {};
    members[req.body.uid] = member;
    var data = {
      displayName: req.body.displayName,
      pwd: req.body.pwd,
      partyBit: 0,
      owner: req.body.uid
    };
    data.members = members;
    var newRef = ref.push(req.body, function(err) {
      if (err) { res.json({ error: err }); }
    });

    newRef.once('value', function(sn) {
      var userRef = new Firebase('https://jukebot.firebaseio.com/users/' + req.body.uid);
      userRef.update({
        currentParty: sn.key()
      }, function(err) {
        if (err) { res.json({ error: err }); }
        // resolve the new key
        newRef.once('value', function(sn) {
          res.json({ key: sn.key() });
        });
      });
    });

  });
};
