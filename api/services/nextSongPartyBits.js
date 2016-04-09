var Firebase = require('firebase');

function randNumBetween (n1, n2) {
  return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
}

module.exports = function(req, res) {
  var partyRef = new Firebase('https://jukebot.firebaseio.com/parties/' + req.params.partyId);
  var usersRef = new Firebase('https://jukebot.firebaseio.com/users');
  partyRef.authWithCustomToken(process.env.APP_SECRET, function(err) {
    if (err) {
      res.json({ err: err });
      return;
    }

    function selectNextSong () {
      return new Promise(function(resolve, reject) {

        partyRef.once('value', function(partySn) {
          var party = partySn.val();
          if (party.metaData.owner !== req.body.authorizedUser) {
            reject({ err: 'Request is unauthorized' });
            return;
          }

          // super awesome party algorithm goes here 
          var members = Object.keys(party.members).filter(function(member) {
            return party.members[member].bucket;
          });

          // handle when no members are found with songs
          if (members.length === 0) {
            // tell the UI that no songs were found
            partyRef.child('metaData').child('nowPlaying').remove();
            resolve();
            return;
          }

          var membersWithSameBit = members.filter(function(member) {
            return party.members[member].partyBit === party.partyBit;
          });

          // handle when there are members with songs, but none with the same partyBit
          if (membersWithSameBit.length === 0) {
            var flippedBit = party.partyBit === 1 ? 0 : 1;
            console.log('flipped party bit', flippedBit)
            partyRef.update({partyBit: flippedBit});
            selectNextSong().then(function(song) {
              resolve(song);
            });
          } else {

            var selectedMember = membersWithSameBit[randNumBetween(0, membersWithSameBit.length - 1)];
            var bucket = Object.keys(party.members[selectedMember].bucket);
            var selectedTrack = bucket[randNumBetween(0, bucket.length - 1)];

            var memberRef = partyRef.child('members').child(selectedMember);
            var flippedBit = party.partyBit === 1 ? 0 : 1;
            memberRef.update({
              partyBit: flippedBit 
            }); 
            memberRef.child('bucket').child(selectedTrack).remove();

            usersRef.once('value', function(usersSn) {
              partyRef.child('metaData').child('nowPlaying').set({
                trackId: selectedTrack,
                albumId: party.members[selectedMember].bucket[selectedTrack].albumId,
                trackName: party.members[selectedMember].bucket[selectedTrack].trackName,
                albumName: party.members[selectedMember].bucket[selectedTrack].albumName,
                artistName: party.members[selectedMember].bucket[selectedTrack].artistName,
                selectedBy: usersSn.child(selectedMember).val().displayName  
              });

              resolve(selectedTrack);
            });

          }

        });
      });
    }
    selectNextSong().then(function(selectedTrack) {
      console.log(selectedTrack);
      res.json({ track: selectedTrack });
    }, function(err) {
      res.json(err);
    });
  });
};
