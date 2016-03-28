var Firebase = require('firebase');

module.exports = function(req, res) {
  var partyRef = new Firebase('https://jukebot.firebaseio.com/parties/' + req.body.partyId);
  var userRef = new Firebase('https://jukebot.firebaseio.com/users/' + req.body.uid);

  // authenticate
  userRef.authWithCustomToken(process.env.APP_SECRET, function(err) {
    if (err) { res.json({ error: err }); }
    
    // query party
    partyRef.once('value', function(sn) {
      
      // grab party password
      var pwd = sn.val().pwd;
      var partyBit = sn.val().partyBit;
      
      // compare party password with user's password
      if (req.body.password === pwd) {
        
        // create membership object to add to party
        var updateObj = {};
        updateObj[req.body.uid] = partyBit;
        
        // establish party membership
        partyRef.child('members').update(
          updateObj, 
          function (err) {
            if (err) {
              res.json({err: err});
              return;
            }

            console.log('added member');
            userRef.update({
              currentParty: sn.key()
            }, function (userErr) {
              
              if (userErr) {
                // TODO: erase all previously created data for this operation
                res.json({ err: userErr });
                return;
              }
              
              // return success data
              res.json({ success: 'whoohoo!' });
            }
          );
        });
        
      // if password doesn't match, then throw incorrect pwd error
      } else {
        res.status(400);
        res.json({ error: 'INCORRECT_PWD' });
      }
    });
  });
};
