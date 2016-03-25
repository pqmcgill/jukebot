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
  PartyList = require('./components/partyList/PartyList'),
  PartyContainer = require('./components/inParty/PartyContainer'),
  SearchContainer = require('./components/inParty/search/SearchContainer'),
  NowPlaying = require('./components/inParty/nowPlaying/NowPlaying'),
  MySongs = require('./components/inParty/mySongs/MySongs'),
  ManageParty = require('./components/inParty/manageParty/ManageParty');
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
      <Route path="parties" component={ PartyList } />
      <Route path="parties/:partyId" component={ PartyContainer } >
        <Route path="search" component={ SearchContainer }>
          <Route path="all" />
          <Route path="tracks" />
          <Route path="artists" />
          <Route path="artists/:artistId" />
          <Route path="albums" />
          <Route path="albums/:albumId" />
        </Route>
        <Route path="nowPlaying" component={ NowPlaying }/>
        <Route path="mySongs" component={ MySongs }/>
        <Route path="manage" component={ ManageParty }/>
      </Route>
      <Route path="create" component={ CreateParty } onEnter={ requireAuth }/>
    </Route>
    <Redirect path="*" to="welcome" />
  </Router> 
);
