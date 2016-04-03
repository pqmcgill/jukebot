let $ = require('jquery');
let session = require('./firebaseUtil').getSession();

// Generic ajax wrapper to use for all api calls
let makeAjaxCall = (path, method, payload) => {
  return new Promise((resolve, reject) => {
    $.ajax(path, {
      data: JSON.stringify(payload),
      method: method,
      headers: {
        'Content-Type': 'application/json',
        firebasetoken: session.token
      },
      error: reject,
      success: resolve
    });
  });
};

module.exports = {
  // calls the service to create a party 
  createParty (partyData) {
    return new Promise((resolve, reject) => {
      console.log(partyData);
      makeAjaxCall('/api/party', 'POST', partyData).then(resolve, reject);
    });
  },

  joinParty (partyAttempt) {
    return new Promise((resolve, reject) => {
      makeAjaxCall('/api/join', 'POST', partyAttempt).then(resolve, reject);
    });
  },
  
  nextSong (partyId) {
    return new Promise((resolve, reject) => {
      makeAjaxCall('/api/nextSong/' + partyId, 'GET').then(resolve, reject);
    });
  }
};
