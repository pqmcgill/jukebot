let React = require('react');

let SearchInput = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    query: React.PropTypes.string
  },

  render () {
    return (
      <div className="search">
        <span className="fa fa-search"></span>
        <input onChange={ this.props.onChange } value={ this.props.query }/>
      </div>
    );
  }
});

module.exports = SearchInput;
