let React = require('react');

let Overlay = React.createClass({

  propTypes: {
    visible: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      visible: true
    };
  },

  preventDefault (e) {
    e.preventDefault();
  },

  render () {
    let visible = this.props.visible ? 
      'overlay-wrapper' : 
      'overlay-wrapper hidden';

    console.log(visible);
    return (
      <div className={ visible }>
        <div onClick={ this.preventDefault } className="overlay fa fa-overlay" />
        <div className="overlay-content">
          { this.props.children }
        </div>
      </div>
    );
  }

});

module.exports = Overlay;
