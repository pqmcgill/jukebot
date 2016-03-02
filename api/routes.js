module.exports = function(app) {
  // declare all of our routes to our services here
  app.get('/api/test', require('./services/test'));

};
