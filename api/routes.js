var Firebase = require('firebase');

module.exports = function(app) {

  // load API middleware
  app.use('/api/*', require('./middleware/fbAuthClient'));

  // declare all of our routes to our services here
  app.get('/api/test', require('./services/test'));
  app.get('/api/testAuth', require('./services/testAuth'));

};