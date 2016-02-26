let React = require('react'),
  ReactDOM = require('react-dom'),
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
    let $div = $('<div/>'),
      el = ReactDOM.findDOMNode(this),
      btnOffset = $(el).offset(),
      xPos = e.pageX - btnOffset.left,
      yPos = e.pageY - btnOffset.top;

      $div.addClass('ripple-effect');
      $div.css('height', $(el).height());
      $div.css('width', $(el).height());
      $div.css({
        top: yPos - ($div.height() / 2),
        left: xPos - ($div.width() / 2)
      }).appendTo($(el));

      window.setTimeout(function() {
        $div.remove();
      }, 2000);
      
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
