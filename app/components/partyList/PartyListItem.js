let React = require('react');

let PartyListItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    onMyClick: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      onMyClick: (e) => {
        e.preventDefault();
        console.log('default click');
      }
    };
  },

  render () {
    return (
      <li>
        { this.props.name }
        <button onClick={ this.props.onMyClick }>Join</button>
      </li>
    );
  }
});

module.exports = PartyListItem;
