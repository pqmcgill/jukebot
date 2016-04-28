let React = require('react'),
  ReactDOM = require('react-dom'),
  { generateMouseEventRipple } = require('../../util/rippleGenerator'),

  $ = require('jquery');

let Button = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    classString: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      disabled: false,
      onClick: () => {},
      classString: ''
    };
  },

  handleClick (e) {
    let el = ReactDOM.findDOMNode(this);
    generateMouseEventRipple(el, e, {
      timeout: 2000,
      rippleSpeed: 'slow'
    });
    this.props.onClick(e);
  },

  render () {
    let classString = 'ripple ';
    classString += this.props.disabled ? 'disabled ' : '';
    classString += this.props.classString;
    return (
      <button className={ classString } 
        onClick={ this.handleClick }
        disabled={ this.props.disabled }>
        { this.props.children }
      </button>
    );
  }
});

module.exports = Button;
