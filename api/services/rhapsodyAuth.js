// // var request = require('request');
// var client_id = process.env.RHAP_API_KEY;
// var client_secret = process.env.RHAP_SECRET_KEY;

// console.log('HERE!');

// module.exports = function(req, res) {
    
//   console.log(req.body);
//   var code = req.body.code;
//   res.json({
//       foo: 'BAR'
//   });
// //   if(code) {
// //       console.log(code, client_id, client_secret);
// //       request.post({
// //           url: 'http://api.rhapsody.com/oauth/access_token',
// //           form: {
// //               'client_id': client_id,
// //               'client_secret': client_secret,
// //               'response_type': 'code',
// //               'code': code,
// //               'redirect_uri': 'localhost:8081',
// //               'grant_type': 'authorization_code'
// //           }
// //       }, function(err, response, body) {
// //           if (err) {
// //               res.status(500);
// //               res.json({
// //                   error: err,
// //                   status: 500,
// //                   msg: 'Error connecting to rhapsody auth service'
// //               });
// //           } else {
// //               res.json(body);
// //           }
// //       });
// //   } else {
// //       res.status(400);
// //       res.json({
// //           status: 400,
// //           msg: 'Bad Request: valid code required'
// //       });
// //   }
// };