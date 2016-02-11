let ReactDOM = require('react-dom');

require('./style/main.scss');

let Routes = require('./Routes');

let rootInstance = ReactDOM.render(
  Routes,
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
