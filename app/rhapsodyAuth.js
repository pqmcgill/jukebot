
  login () {
    
    var code = window.location.search.substring(1).split('=');
    console.log(code);
    if (!code[0]) { 
      console.log('not found');
      window.location.replace('https://api.rhapsody.com/oauth/authorize?client_id=N2RlOGQ5ODgtNjUzMC00NGIzLTllNjQtMGI2NmRhNjVkNTYx&redirect_uri=http://jukebothero.com&response_type=code');
    } else {
      $.ajax({
        type: 'POST',
        url: 'http://rocky-castle-7896.herokuapp.com/api/v1/rhapsody/auth',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          code: code[1]
        }),
        success: function(res) {
          console.log(res);
        },
        error: function(err) {
          console.log('error', err);
        }
      });
    }
  },
