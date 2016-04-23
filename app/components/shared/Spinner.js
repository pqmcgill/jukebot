let React = require('react');

let Spinner = React.createClass({

  propTypes: {

  },

  render () {
    return (
      <div className={ this.props.className } >
        <i className="fa fa-spinner fa-spin fa-pulse"></i>
      </div>
    );
  }
});

module.exports = Spinner;
