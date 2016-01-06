var React = require('react'),
  ReactDOM = require('react-dom'),
  Router = require('react-router').Router,
  Route = require('react-router').Route,
  App = require('./components/App'),
  SignupContainer = require('./components/SignupContainer'),
  Home = require('./components/Home');

var rootInstance = ReactDOM.render(
  <Router>
    <Route path="/" component={ App }>
      <Route path="login" component={ SignupContainer } />
      <Route path="home" component={ Home } />
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
