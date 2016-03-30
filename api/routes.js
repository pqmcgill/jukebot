var Firebase = require('firebase');

module.exports = function(app) {

  // load API middleware
  app.use('/api/*', require('./middleware/fbAuthClient'));

  // declare all of our routes to our services here
  app.post('/api/test', require('./services/test'));
  app.get('/api/testAuth', require('./services/testAuth'));

  // Create Party
  app.post('/api/party', require('./services/createParty'));
  // Join an Existing Party
  app.post('/api/join', require('./services/joinParty'));
  // Leave a Party
  //  app.post('/api/leave', require('./services/leaveParty'));
  
  // app.post('/api/rhapsody/auth', require('./services/rhapsodyAuth'));

  app.get('/api/*', function(req, res) {
    res.json({ "error": "404 - Not found" });
  }); 
};
