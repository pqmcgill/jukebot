var React = require('react'),
  ReactDOM = require('react-dom');

var App = React.createClass({
  render: function() {
    return (
      <div>Hello, World!</div>
    );
  }
});

var rootInstance = ReactDOM.render(<App />, document.getElementById('app'));

// hot loading of modules
if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance];
    }
  });
}
