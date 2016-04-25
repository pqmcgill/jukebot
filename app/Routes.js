let React = require('react'),
  { Router, Route, IndexRedirect, Redirect, browserHistory } = require('react-router');

// components
let App = require('./components/App'),
  SignupContainer = require('./components/loginRegister/SignupContainer'),
  Login = require('./components/loginRegister/Login'),
  ForgotLogin = require('./components/loginRegister/ForgotLogin'),
  Signup = require('./components/loginRegister/Signup'),
  Home = require('./components/home/Home'),
  CreateParty = require('./components/create/CreateParty'),
  JoinParty = require('./components/join/JoinParty'),
  PartyList = require('./components/partyList/PartyList'),
  PartyContainer = require('./components/inParty/PartyContainer'),
  SearchContainer = require('./components/inParty/search/SearchContainer'),
  SearchArtists = require('./components/inParty/search/SearchArtists'),
  SearchAll = require('./components/inParty/search/SearchAll'),
  SearchTracks = require('./components/inParty/search/SearchTracks'),
  SearchAlbum = require('./components/inParty/search/SearchAlbum'),
  SearchAlbums = require('./components/inParty/search/SearchAlbums'),
  SearchArtist = require('./components/inParty/search/SearchArtist'),
  NowPlaying = require('./components/inParty/nowPlaying/NowPlaying'),
  MySongs = require('./components/inParty/mySongs/MySongs'),
  ManageParty = require('./components/inParty/manageParty/ManageParty'),
  Menu = require('./components/inParty/menu/Menu');

// other modules
let { requireAuth, requireUnAuth } = require('./util/authenticate');

module.exports = (
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRedirect to="welcome" />
      <Route path="welcome" component={ SignupContainer } onEnter={ requireUnAuth }>
        <IndexRedirect to="/login" />
        <Route path="/signup" />
        <Route path="/login" /> 
        <Route path="/forgot" />
      </Route>
      <Route path="home" component={ Home } onEnter={ requireAuth }/>
      <Route path="parties" component={ PartyList } onEnter={ requireAuth }/>
      <Route path="join/:partyId" component={ JoinParty } onEnter={ requireAuth }/>
      <Route path="parties/:partyId" component={ PartyContainer } onEnter={ requireAuth }>
        <IndexRedirect to="nowPlaying" />
        <Route path="search" component={ SearchContainer }>
          <Route path="all" component={ SearchAll } />
          <Route path="tracks" component={ SearchTracks} />
          <Route path="artists" component={ SearchArtists } />
          <Route path="artists/:artistId" component={ SearchArtist }/>
          <Route path="albums" component={ SearchAlbums }/>
          <Route path="albums/:albumId" component={ SearchAlbum }/>
        </Route>
        <Route path="nowPlaying" component={ NowPlaying }/>
        <Route path="mySongs" component={ MySongs }/>
        <Route path="menu" component={ Menu }/>
      </Route>
      <Route path="create" component={ CreateParty } onEnter={ requireAuth }/>
    </Route>
    <Redirect path="*" to="welcome" />
  </Router> 
);
