let $ = require('jquery');
let session = require('./firebaseUtil').getSession();

// Generic ajax wrapper to use for all api calls
let makeAjaxCall = (path, method, payload) => {
  return new Promise((resolve, reject) => {
    $.ajax(path, {
      contentType: 'application/json',
      data: payload,
      method: method,
      headers: {
        firebaseToken: session.token
      },
      error: reject(err),
      success: resolve(data)
    });
  });
};

module.exports = {
  createParty (partyData) {
    return new Promise((resolve, reject) => {
      makeAjaxCall('/api/party', 'POST', partyData).then(resolve, reject);
    });
  }
};
