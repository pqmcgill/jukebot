var express = require('express');
var path = require('path');
var app = express();

var static_path = path.join(__dirname, 'dist');

var PORT = process.env.PORT || 8080;

app.use(express.static(static_path));

// pushstate configuration!!!
app.get('*', function(req, res) {
  res.sendFile('index.html', {
    root: static_path
  });
});

// define api calls eventually...

app.listen(PORT, function(err) {
  if (err) { console.log(err); }
  console.log('Listening on port:', PORT);
});

