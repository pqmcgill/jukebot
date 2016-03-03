var Firebase = require('firebase');

module.exports = function(req, res) {
  var ref = new Firebase('https://jukebot.firebaseio.com/parties');
  
  // first authenticate as super user 
  ref.authWithCustomToken(process.env.APP_SECRET, function(err) {
    if (err) { res.json({ error: err }); }
    
    // create new data, and generate reference to it
    var newRef = ref.push(req.body, function(err) {
      if (err) { res.json({ error: err }); }
    });

    // resolve the new key
    newRef.once('value', function(sn) {
      res.json({ key: sn.key() });
    });
  });
};
