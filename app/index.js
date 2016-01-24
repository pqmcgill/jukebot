var React = require('react'),
  ReactDOM = require('react-dom'),
  Router = require('react-router').Router,
  Route = require('react-router').Route,
  App = require('./components/App'),
  SignupContainer = require('./components/loginRegister/SignupContainer'),
  Home = require('./components/authenticated/Home'),
  SongSearch = require('./components/authenticated/search/SongSearch'),
  { requireAuth, requireUnAuth } = require('./util/authenticate');

var rootInstance = ReactDOM.render(
  <Router>
    <Route path="/" component={ App }>
      <Route path="welcome" component={ SignupContainer } onEnter={ requireUnAuth }/>
      <Route path="home" component={ Home } onEnter={ requireAuth }/>
      <Route path="search" component={ SongSearch } onEnter={ requireAuth }/>
    </Route>
  </Router>, 
  document.getElementById('app')
);

// hot loading of modules
if (module.hot) {
  require('react-hot-loader/Injection')
    .RootInstanceProvider.injectProvider({
      getRootInstances () {
        // Help React Hot Loader figure out the root 
        // component instances on the page:
        return [rootInstance];
      }
    });
}
