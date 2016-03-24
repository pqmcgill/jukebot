let $ = require('jquery');
let { CLIENT_ID, SEARCH_URL, TOP_TRACKS_URL } = require('./constants');
let clone = require('./util').clone;

// General search function
// options looks like this
// {
//   q: <String>      // query string
//   type: <String>   // type ('artist', 'track', 'album')
//   limit: <Number>  // simit search results
//   offset: <Number> // offset serach results
// }
let search = (options, url) => {
  let { q, offset, limit, type} = options;
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
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
  });
};

// Get Top Tracks
// options look like this
// {
//  limit: <Number>  // limit search results
//  offset: <Number> // offset search results
// }
let getArtistsTopTracks = (options, artId) => {
  let { offset, limit } = options;
  let url = `https://api.rhapsody.com/v1/artists/${artId}/tracks/top`;
  return new Promise((resolve, reject) => {
    search(options, url)
      .then((data) => {
        resolve({ type: 'track', data: data });
      }, (err) => {
        reject(err);
      });
  });
};

// get an album's tracks
let getAlbumTracks = (albumId) => {
  let url = `https://api.rhapsody.com/v1/albums/${albumId}/tracks`;
  return new Promise((resolve, reject) => {
    search({}, url)
      .then((data) => {
        resolve([{ type: 'track', data: data }]);
      }, (err) => {
        reject(err);
      });
  });
};

// get an artist's albums
let getArtistsAlbums = (artistId) => {
  let url = `https://api.rhapsody.com/v1/artists/${artistId}/albums?limit=1000`;
  return new Promise((resolve, reject) => {
    search({}, url)
      .then((data) => {
        resolve({ type: 'album', data: data.filter((d) => { return d.type.id === 0 }) });
      }, (err) => {
        reject(err);
      });
  });
}

// gets both artist's top tracks and list of albums
let getArtistData = (artistId) => {
  return Promise.all([
    getArtistsTopTracks({ limit: 6, offset: 0 }, artistId),
    getArtistsAlbums(artistId)
  ]);
}

// takes a string, or Array<String>
// returns promise 
// promise resolves either single Object,
// or Array<Object> keyed by type
let searchByType = (options, type) => {
  if (Object.prototype.toString.call(type) !== '[object Array]') {
    type = [type];
  }
  let url = 'https://api.rhapsody.com/v1/search/typeahead';
  return Promise.all(type.map((t, i) => {
    let cloned_options = clone(options);
    cloned_options.type = t;
    return new Promise((response, reject) => {
      search(cloned_options, url).then((data) => {
        response({
          type: t,
          data: data
        });
      }, (err) => {
        reject(err);
      });
    });
  }));
};

module.exports = {
  search: search,
  searchByType: searchByType,
  getArtistsTopTracks: getArtistsTopTracks,
  getAlbumTracks: getAlbumTracks,
  getArtistData: getArtistData
};
