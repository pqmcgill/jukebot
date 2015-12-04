var React = require('react'),
  ReactDOM = require('react-dom');

var App = React.createClass({
  render: function() {
    return (
      <div>Hello, World!</div>
    );
  }
});

ReactDOM.render(<App />, document.body);
