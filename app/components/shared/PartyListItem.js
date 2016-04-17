let React = require('react');

let PartyListItem = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    imgSrc: React.PropTypes.string,
    imgAlt: React.PropTypes.string,
    mainText: React.PropTypes.string,
    subText: React.PropTypes.string,
    iconClass: React.PropTypes.string,
    onIconClick: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  getClassName () {
    let className = 'listItem' + (this.props.selected ? ' selected' : '');
    console.log('class', className);
    return className;
  },

  render () {
    return ( 
      <li className={ this.getClassName() } onClick={ this.props.onClick }>
        <div className="image-cropper">
          <img src={ this.props.imgSrc } alt={ this.props.imgAlt } />
        </div>
        <div className="itemText">
          <p>{ this.props.mainText }</p>
          { this.props.subText ? <p>{ this.props.subText }</p> : '' }
        </div>
        <i className={ this.props.iconClass } onClick={ this.props.onIconClick }></i>
      </li>
    );
  }
});

module.exports = PartyListItem;
