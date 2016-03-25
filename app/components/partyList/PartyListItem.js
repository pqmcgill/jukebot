let React = require('react');

let PartyListItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    onMyClick: React.PropTypes.func,
    partyId: React.PropTypes.string.isRequired
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
        <button onClick={ this.props.onMyClick.bind(null, this.props.partyId) }>Join</button>
      </li>
    );
  }
});

module.exports = PartyListItem;
