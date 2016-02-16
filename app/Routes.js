let React = require('react'),
  { Router, Route, IndexRedirect, Redirect, browserHistory } = require('react-router');

// components
let App = require('./components/App'),
  SignupContainer = require('./components/loginRegister/SignupContainer'),
  Login = require('./components/loginRegister/Login'),
  Signup = require('./components/loginRegister/Signup'),
  Home = require('./components/home/Home'),
  CreateParty = require('./components/create/CreateParty'),
  PartyList = require('./components/partyList/PartyList');

// other modules
let { requireAuth, requireUnAuth } = require('./util/authenticate');

module.exports = (
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRedirect to="welcome" />
      <Route path="welcome" component={ SignupContainer } onEnter={ requireUnAuth }>
        <IndexRedirect to="/login" />
        <Route path="/signup" component={ Signup }/>
        <Route path="/login" component={ Login }/> 
      </Route>
      <Route path="home" component={ Home } onEnter={ requireAuth }/>
      <Route path="parties" component={ PartyList } onEnter={ requireAuth }/>
      <Route path="create" component={ CreateParty } onEnter={ requireAuth }/>
    </Route>
    <Redirect path="*" to="welcome" />
  </Router> 
);
