let $ = require('jquery');
let { CLIENT_ID, SEARCH_URL } = require('./constants');
let clone = require('./util').clone;

// General search function
// options looks like this
// {
//   q: <String>      // query string
//   type: <String>   // type ('artist', 'track', 'album')
//   limit: <Number>  // simit search results
//   offset: <Number> // offset serach results
// }
let search = (options, cb) => {
  let { q, offset, limit, type } = options;
  return new Promise((resolve, reject) => {
    if (q) {
      $.ajax({
        url: SEARCH_URL,
        data: {
          q: q,
          offset: offset,
          limit: limit,
          type: type
        },
        method: 'GET',
        dataType: 'json',
        beforeSend (xhr) {
          xhr.setRequestHeader('apikey', CLIENT_ID);
          xhr.setRequestHeader('Content-Type', 'application/json');
        },
        success (data) {
          resolve(data);
        },
        error (err) {
          reject(err);
        }
      });
    }
    else {
      resolve([]);
    }
  });
};

// takes a string, or Array<String>
// returns promise 
// promise resolves either single Object,
// or Array<Object> keyed by type
let searchByType = (options, type) => {
  if (Object.prototype.toString.call(type) !== '[object Array]') {
    type = [type];
  }
  return Promise.all(type.map((t, i) => {
    let cloned_options = clone(options);
    cloned_options.type = t;
    return new Promise((response, reject) => {
      search(cloned_options).then((data) => {
        let resObj = Object.create({});
        resObj[t + 's'] = data;
        response(resObj);
      }, (err) => {
        reject(err);
      });
    });
  }));
};

module.exports = {
  search: search,
  searchByType: searchByType
};
