var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var static_path = path.join(__dirname, 'dist');

var PORT = process.env.PORT || 8080;

// use bodyParser for REST calls
app.use('/api/*', bodyParser.json());

// ...otherwise just serve static content
app.use(express.static(static_path));

// load our REST layer
require('./api/routes')(app);

// pushstate configuration!!!
app.get('*', function(req, res) {
  res.sendFile('index.html', {
    root: static_path
  });
});

app.listen(PORT, function(err) {
  if (err) { console.log(err); }
  console.log('Listening on port:', PORT);
});

