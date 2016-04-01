var songs = [
  'Tra.5156528',
  'Tra.2169032',
  'Tra.7289598',
  'Tra.5156525'
];

module.exports = function(req, res) {
    console.log('called');
    var track;
    if (songs.length > 0) {
        track = songs.shift();
    } else {
        track = undefined;
    }
    res.json({ track: track });
};