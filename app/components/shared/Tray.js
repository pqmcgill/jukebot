let React = require('react');

let Tray = React.createClass({
  propTypes: {
    shown: React.PropTypes.boolean
  },

  getDefaultProps () {
    return {
      shown: true
    };
  },

  render () {
    let trayClass = 'tray ' + (this.props.shown ? '' : 'hide');
    return (
      <div className={ trayClass }>{ this.props.children }</div>
    );
  }
});

module.exports = Tray;
