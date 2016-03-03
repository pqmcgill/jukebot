// An example service for serving json to the app via REST
module.exports = function(req, res) {
  res.json({ "test": "helloworld" });
};
