let React = require('react');

let PartyContainer = React.createClass({
  render () {
    console.log(this.props.params.partyId);
    return (
      <div className="component home">
        { this.props.children }
      </div>
    );
  }
});

module.exports = PartyContainer;
