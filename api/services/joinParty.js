var Firebase = require('firebase');

module.exports = function(req, res) {
  var partyRef = new Firebase('https://jukebot.firebaseio.com/parties/' + req.body.partyId);
  var userRef = new Firebase('https://jukebot.firebaseio.com/users/' + req.body.uid);

  userRef.authWithCustomToken(process.env.APP_SECRET, function(err) {
    if (err) { res.json({ error: err }); }

    partyRef.once('value', function(sn) {
      var pwd = sn.val().pwd;
      console.log(req.body.password, pwd);
      if (req.body.password === pwd) {
        var updateObj = {};
        updateObj['req.body.uid'] = true;
        partyRef.child('members').update(
          updateObj, 
          (err) => {
            if (err) res.json({err: err});
            userRef.update({
              currentParty: sn.key()
            }, (userErr) => {
              if (userErr) res.json({ err: userErr });
              res.json({ success: 'whoohoo!' });
            }
          );
        });
      } else {
        res.json({ error: 'INCORRECT_PWD' });
      }
    });
  });
};
