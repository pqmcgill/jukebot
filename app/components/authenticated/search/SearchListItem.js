let React = require('react');

let SearchListItem = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func,
    searchId: React.PropTypes.string,
    imgUrl: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      onSelect () {
        console.log('default click...');
      }
    };
  },

  render () {
    return (
      <span onClick={ this.props.onSelect.bind(null, this.props.searchId) }><img src={ this.props.imgUrl} />{ this.props.text }</span>
    );
  }
});

module.exports = SearchListItem;
