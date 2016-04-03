var Firebase = require('firebase');

function randNumBetween (n1, n2) {
  return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
}

module.exports = function(req, res) {
  var partyRef = new Firebase('https://jukebot.firebaseio.com/parties/' + req.params.partyId);
  partyRef.authWithCustomToken(process.env.APP_SECRET, function(err) {
    if (err) {
      res.json({ err: err });
      return;
    }

    partyRef.once('value', function(partySn) {
      var party = partySn.val();
      if (party.metaData.owner !== req.body.authorizedUser) {
        res.json({ err: 'Request is unauthorized' });
        return;
      }

      // super awesome party algorithm goes here 
      var members = Object.keys(party.members).filter(function(member) {
        return party.members[member].bucket;
      });

      // handle when no members are found with songs
      if (members.length === 0) {
        res.json({});
        return;
      }

      var selectedMember = members[randNumBetween(0, members.length - 1)];
      var bucket = Object.keys(party.members[selectedMember].bucket);
      var selectedTrack = bucket[randNumBetween(0, bucket.length - 1)];

      partySn.child('members')
        .child(selectedMember)
        .child('bucket')
        .child(selectedTrack)
        .ref()
        .remove();

      console.log(selectedTrack);
      res.json({ track: selectedTrack });
    });
  
  });
};
