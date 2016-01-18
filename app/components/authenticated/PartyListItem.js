let React = require('react');

let PartyListItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render () {
    return (
      <li>
        { this.props.name }
      </li>
    );
  }
});

module.exports = PartyListItem;
