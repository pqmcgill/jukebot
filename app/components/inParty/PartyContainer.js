let React = require('react');
let rhapsodyUtil = require('../../util/rhapsodyUtil');
let rhapsodyMetaData = require('../../util/rhapsodyMetaData');
let firebaseUtil = require('../../util/firebaseUtil');
let { nextSong } = require('../../util/api');
let Link = require('react-router').Link;
let ReactFireMixin = require('reactfire');
let Firebase = require('firebase');

let PartyContainer = React.createClass({
  mixins: [ ReactFireMixin ],
  
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    addSongToBucket: React.PropTypes.func,
    nowPlaying: React.PropTypes.object,
    mySongs: React.PropTypes.object,
    removeSong: React.PropTypes.func
  },

  getChildContext () {
    let nowPlaying = {};
    if (this.state.partyMetaData && this.state.partyMetaData.nowPlaying) {
      nowPlaying = this.state.partyMetaData.nowPlaying;
    }

    let mySongs = {};
    if (this.state.partyMembers && this.state.partyMembers[firebaseUtil.getSession().uid]) {
      mySongs = this.state.partyMembers[firebaseUtil.getSession().uid].bucket || {};
    }

    return {
      addSongToBucket: this.addSongToBucket,
      nowPlaying: nowPlaying,
      mySongs: mySongs,
      removeSong: this.removeSong
    };
  },
  
  getInitialState () {
    return {
      user: {},
      pickingSong: false,
      isOwner: false,
      partyMetaData: {},
      partyMembers: {},
      user: {}
    };
  },

  componentWillMount () {
    let code = this.props.location.query.code;
    
    // Create Reference to Party Data and User's Data
    this.partyMetaDataRef = new Firebase('https://jukebot.firebaseio.com/parties/' + this.props.params.partyId + '/metaData');
    this.partyMemberDataRef = new Firebase('https://jukebot.firebaseio.com/parties/' + this.props.params.partyId + '/members');
    this.userRef = new Firebase('https://jukebot.firebaseio.com/users/' + firebaseUtil.getSession().uid)
    this.hasSongsRef = new Firebase('https://jukebot.firebaseio.com/parties/' + this.props.params.partyId + '/metaData/hasSongs');
    this.bindAsObject(this.partyMetaDataRef, 'partyMetaData');
    this.bindAsObject(this.partyMemberDataRef, 'partyMembers');
    this.bindAsObject(this.userRef, 'user');
    
    this.partyMetaDataRef.once('value', (partyMetaDataSn) => {
      this.userRef.once('value', (userSn) => {
        
        // verify party ownership. If the valid owner is found, then
        // authenticate with rhapsody and initialize the party
        if (partyMetaDataSn.val().owner === userSn.val().uid) {
          this.authenticate(code);
        }
        
      });
    });
  },

  goToSearch (e) {
    e.preventDefault();
    this.context.router.push('search');
  },

  addSongToBucket (trackData) {
    let trackId = trackData.id,
      albumId = trackData.album.id,
      trackName = trackData.name,
      albumName = trackData.album.name,
      artistName = trackData.artist.name;

    if (this.state.partyMembers[this.state.user.uid].bucket) {
      let obj = {};
      obj[rhapsodyMetaData.parseId( trackId )] = {
        albumId: rhapsodyMetaData.parseId( albumId ),
        trackName: trackName,
        albumName: albumName,
        artistName: artistName
      };
      this.partyMemberDataRef.child(this.state.user.uid).child('bucket').update(obj, () => {
        this.hasSongsRef.set(true);
      });
    } else {
      let obj = {bucket: {}};
      obj.bucket[rhapsodyMetaData.parseId( trackId )] = {
        albumId: rhapsodyMetaData.parseId( albumId ),
        trackName: trackName,
        albumName: albumName,
        artistName: artistName
      };
      this.partyMemberDataRef.child(this.state.user.uid).update(obj, () => {
        this.hasSongsRef.set(true);
      });
    }
  },
  
  /*******************************
   ***** PARTY OWNER METHODS *****
   *******************************/
   
  authenticate (code) {
    if (code) {
      rhapsodyUtil.authenticate(code, this.props.location.pathname, this.initializeParty);
    } else {
      rhapsodyUtil.authenticate(null, this.props.location.pathname, this.initializeParty);
    }
  },
  
  initializeParty (err) {
    if (err) {
      console.log('ERROR authenticating with rhapsody', err);
      return;
    }

    this.setState({
      isOwner: true
    });
    
    rhapsodyUtil.registerListener('error', this.handleRhapsodyError);
    rhapsodyUtil.registerListener('unauthorized', (e) => {
      console.log('unauthorized in component');
    });
    rhapsodyUtil.registerListener('playstopped', this.queryNextSong);
    rhapsodyUtil.registerListener('queueloaded', this.queryNextSong);
    rhapsodyUtil.init(() => {
      console.log('party started');
    });
    rhapsodyUtil.registerListener('queuechanged', this.queryNextSong);
  },
  
  queryNextSong () {
    console.log('getting next song...');
    if (!this.state.pickingSong) {
      this.setState({ 
        pickingSong: true 
      }, () => {
        nextSong(this.props.params.partyId).then((data) => {

          this.setState({
            pickingSong: false
          });

          if (data.track === undefined) {
            this.hasSongsRef.set(false, () => {
              this.listenForSongs();
            });
          } else {
            if (data.track) {
              setTimeout(() => {
                rhapsodyUtil.playTrack(rhapsodyMetaData.formatId(data.track));
              }, 1000);
            }
          }
        });
      });
    }
  },

  listenForSongs () {
    this.hasSongsRef.on('value', (hasSongsSn) => {
      let val = hasSongsSn.val();
      if (val) {
        this.queryNextSong();
        this.hasSongsRef.off();
      }
    });
  },

  removeSong (trackId) {
    console.log(trackId);
    console.log(rhapsodyMetaData.parseId(trackId));
    this.partyMemberDataRef
      .child(firebaseUtil.getSession().uid)
      .child('bucket')
      .child(rhapsodyMetaData.parseId(trackId))
      .remove();
  },

  handleRhapsodyError (err) {
    console.log('error', err);
    // there was an unauthorized request
    if (err.data.code === 401) {
      rhapsodyUtil.destroyTokens();
      // TODO: display prompt to either re-authenticate or kill party
      rhapsodyUtil.authenticate();
    }
  },
  
  /********************************
   ***** /PARTY OWNER METHODS *****
   ********************************/

  render () {
    let { partyId } = this.props.params;
    //    let childrenWithProps = React.Children.map(this.props.children, (child) => {
    //      let mySongs = this.state.partyMembers && this.state.partyMembers[firebaseUtil.getSession().uid] ?
    //        this.state.partyMembers[firebaseUtil.getSession().uid].bucket || {} :
    //        {}
    //      React.cloneElement(child, { mySongs: mySongs });
    //    });
    return (
      <div className="component inParty no-padding">
        <div className="tabs">
          <Link className="tab menu-tab" activeClassName="active" to={ '/parties/' + partyId + '/menu' }>MENU</Link>
          <div className="main-tab">
            <Link className="tab" activeClassName="active" to={ '/parties/' + partyId + '/search' }>Search</Link>
            <Link className="tab" activeClassName="active" to={ '/parties/' + partyId + '/nowPlaying' }>Now Playing</Link>
            <Link className="tab" activeClassName="active" to={ '/parties/' + partyId + '/mySongs' }>My Tracks</Link>
          </div>
        </div>
        { this.props.children }
      </div>
    );
  }
});

module.exports = PartyContainer;
