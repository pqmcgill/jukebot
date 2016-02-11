let React = require('react'),
  { Router, Route, browserHistory } = require('react-router');

// components
let App = require('./components/App'),
  SignupContainer = require('./components/loginRegister/SignupContainer'),
  Home = require('./components/home/Home'),
  CreateParty = require('./components/create/CreateParty'),
  PartyList = require('./components/partyList/PartyList');

// other modules
let { requireAuth, requireUnAuth } = require('./util/authenticate');

module.exports = (
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <Route path="welcome" component={ SignupContainer } onEnter={ requireUnAuth }/>
      <Route path="home" component={ Home } onEnter={ requireAuth }/>
      <Route path="parties" component={ PartyList } onEnter={ requireAuth }/>
      <Route path="create" component={ CreateParty } onEnter={ requireAuth }/>
    </Route>
  </Router> 
);
