let React = require('react');
let rhapsodyUtil = require('../../util/rhapsodyUtil');
let rhapsodyMetaData = require('../../util/rhapsodyMetaData');
let firebaseUtil = require('../../util/firebaseUtil');
let { nextSong, leaveParty, endParty } = require('../../util/api');
let Link = require('react-router').Link;
let ReactFireMixin = require('reactfire');
let Firebase = require('firebase');
let { debounce } = require('../../util/util');

let PartyContainer = React.createClass({
  mixins: [ ReactFireMixin ],
  
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    addSongToBucket: React.PropTypes.func,
    nowPlaying: React.PropTypes.object,
    mySongs: React.PropTypes.object,
    removeSong: React.PropTypes.func,
    hasVetoed: React.PropTypes.bool,
    veto: React.PropTypes.func,
    user: React.PropTypes.object,
    startedPlaying: React.PropTypes.bool,
    logout: React.PropTypes.func,
    logoutAndEndParty: React.PropTypes.func,
    leaveParty: React.PropTypes.func,
    endParty: React.PropTypes.func,
    isOwner: React.PropTypes.bool
  },

  getChildContext () {
    let nowPlaying = {};
    let startedPlaying = false;
    if (this.state.partyMetaData && this.state.partyMetaData.nowPlaying) {
      nowPlaying = this.state.partyMetaData.nowPlaying;
      startedPlaying = this.state.partyMetaData.startedPlaying;
    }

    let mySongs = {};
    if (this.state.partyMembers && this.state.partyMembers[firebaseUtil.getSession().uid]) {
      mySongs = this.state.partyMembers[firebaseUtil.getSession().uid].bucket || {};
    }

    let hasVetoed = true;
    if (this.state.hasVetoed['.key'] && this.state.hasVetoed['.value'] === null) {
      hasVetoed = false;
    }

    let user = {};
    if (this.state.user) {
      user = this.state.user;
    }

    let isOwner = false;
    if (this.state.partyMetaData && this.state.user) {
      isOwner = this.state.user.uid === this.state.partyMetaData.owner;
    }

    return {
      addSongToBucket: this.addSongToBucket,
      nowPlaying: nowPlaying,
      mySongs: mySongs,
      removeSong: this.removeSong,
      veto: this.veto,
      hasVetoed: hasVetoed,
      user: user,
      startedPlaying: startedPlaying,
      logout: this.logout,
      logoutAndEndParty: this.logoutAndEndParty,
      leaveParty: this.leaveParty,
      endParty: this.endParty,
      isOwner: isOwner
    };
  },
  
  getInitialState () {
    return {
      user: {},
      pickingSong: false,
      isOwner: false,
      partyMetaData: {},
      partyMembers: {},
      user: {},
      hasVetoed: {}
    };
  },

  componentWillMount () {
    let code = this.props.location.query.code;
    
    // Create Reference to Party Data and User's Data
    this.partyMetaDataRef = new Firebase('https://jukebot.firebaseio.com/parties/' + this.props.params.partyId + '/metaData');
    this.partyMemberDataRef = new Firebase('https://jukebot.firebaseio.com/parties/' + this.props.params.partyId + '/members');
    this.userRef = new Firebase('https://jukebot.firebaseio.com/users/' + firebaseUtil.getSession().uid)
    this.vetosRef = new Firebase('https://jukebot.firebaseio.com/parties/' + this.props.params.partyId + '/vetos');
    this.hasSongsRef = new Firebase('https://jukebot.firebaseio.com/parties/' + this.props.params.partyId + '/metaData/hasSongs');
    this.bindAsObject(this.partyMetaDataRef, 'partyMetaData');
    this.bindAsObject(this.partyMemberDataRef, 'partyMembers');
    this.bindAsObject(this.userRef, 'user');
    this.bindAsObject(this.vetosRef.child(firebaseUtil.getSession().uid), 'hasVetoed');
    
    this.partyMetaDataRef.once('value', (partyMetaDataSn) => {
      this.userRef.once('value', (userSn) => {
        
        // verify party ownership. If the valid owner is found, then
        // authenticate with rhapsody and initialize the party
        if (partyMetaDataSn.val().owner === userSn.val().uid) {
          this.authenticate(code);
          this.vetosRef.on('value', this.handleVeto);
        }
        
      });
    });
  },

  componentWillUnmount () {
    this.vetosRef.off();
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

  veto () {
    var obj = {};
    obj[this.state.user.uid] = true;
    this.vetosRef.update(obj);
  },

  logout () {
    rhapsodyUtil.clearTokens();
    firebaseUtil.logout();
    this.context.router.replace('/welcome');
  },

  leaveParty () {
    leaveParty(this.props.params.partyId).then(() => {
      this.context.router.replace('/home');
    });
  },
  
  /*******************************
   ***** PARTY OWNER METHODS *****
   *******************************/
  endParty () {
    rhapsodyUtil.pauseTrack();
    rhapsodyUtil.destroyPlayer();
    endParty(this.props.params.partyId).then(() => {
      this.context.router.replace('/home');
    });
  },

  logoutAndEndParty () {
    endParty(this.props.params.partyId).then(() => {
      this.logout();
    });
  },

  handleVeto (vetoSn) {
    let vetos = vetoSn.val();
    if (vetos) { 
      if (Object.keys(vetos).length >= (Object.keys(this.state.partyMembers).length - 1) / 2) {
        this.partyMetaDataRef.child('startedPlaying').remove();
        this.queryNextSong();
      }
    }
  }, 

  authenticate (code) {
    if (code) {
      rhapsodyUtil.authenticate(code, this.props.location.pathname, this.initializeParty);
    } else {
      rhapsodyUtil.authenticate(null, this.props.location.pathname, this.initializeParty);
    }
  },
  
  initializeParty (err) {
    if (err) {
      //console.log('ERROR authenticating with rhapsody', err);
      return;
    }

    this.setState({
      isOwner: true
    });
    
    rhapsodyUtil.registerListener('error', this.handleRhapsodyError);
    rhapsodyUtil.registerListener('unauthorized', (e) => {
      //console.log('unauthorized in component');
    });
    rhapsodyUtil.registerListener('playstopped', this.queryNextSong);
    rhapsodyUtil.registerListener('queueloaded', this.playFirstSong);
    rhapsodyUtil.registerListener('playsessionexpired', this.handleSessionExpired);
    rhapsodyUtil.init(() => {
      //console.log('party started');
    });
    rhapsodyUtil.registerListener('queuechanged', this.queryNextSong);
    rhapsodyUtil.registerListener('playtimer', this.updatePlayTimer);
    
  },

  handleSessionExpired () {
    this.authenticate(null, this.props.location.pathname, this.initializeParty);
  },

  playFirstSong () {
    this.partyMetaDataRef.child('nowPlaying').once('value', (pmSn) => {
      let val = pmSn.val();
      if (val) {
        rhapsodyUtil.playTrack(
          rhapsodyMetaData.formatId(val.trackId),
          val.currentTime
        ).then(() => {
          this.partyMetaDataRef.update({ startedPlaying: true });
        });
      } else {
        this.queryNextSong();
      }
    });
  },

  updatePlayTimer (e) {
    this.partyMetaDataRef.once('value', (pmdSn) => {
      if (pmdSn.val().hasSongs) {
        pmdSn.child('nowPlaying').ref().update({
          currentTime: e.data.currentTime,
          totalTime: e.data.totalTime
        });
      }
    });
  },
  
  queryNextSong () {
    //console.log('getting next song...');
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
              this.partyMetaDataRef.child('nowPlaying').remove();
              rhapsodyUtil.pauseTrack();
              this.listenForSongs();
              this.partyMetaDataRef.child('startedPlaying').remove();
            });
          } else {
            if (data.track) {
              setTimeout(() => {
                if (this.state.vetoing) {
                  this.setState({ vetoing: false });
                }
                this.partyMetaDataRef.child('hasSongs').once('value', (hasSongsSn) => {
                  if (hasSongsSn.val() === undefined || hasSongsSn.val() === true) {
                    rhapsodyUtil.playTrack(rhapsodyMetaData.formatId(data.track)).then(() => {
                      this.partyMetaDataRef.update({
                        startedPlaying: true
                      });
                    });
                  } else {
                    this.partyMetaDataRef.child('startedPlaying').remove();
                    rhapsodyUtil.pauseTrack();
                  }
                });
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

  resumeLastSong () {

  },

  removeSong (trackId) {
    this.partyMemberDataRef
      .child(firebaseUtil.getSession().uid)
      .child('bucket')
      .child(rhapsodyMetaData.parseId(trackId))
      .remove();
  },

  handleRhapsodyError (err) {
    //console.log('error', err);
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
