var React = require('react'),
  ReactDOM = require('react-dom'),
  App = require('./App');



var rootInstance = ReactDOM.render(<App />, document.getElementById('app'));

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
