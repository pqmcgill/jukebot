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
    selected: React.PropTypes.bool,
    selectedIconClass: React.PropTypes.string
  },

  getClassName () {
    let className = 'listItem' + (this.props.selected ? ' selected' : '');
    return className;
  },

  render () {
    let icon;
    if (this.props.selected && this.props.selectedIconClass) {
      icon = <i className={ this.props.selectedIconClass }></i>;
    } else {
      icon = <i className={ this.props.iconClass } onClick={ this.props.onIconClick }></i>;
    }
    return ( 
      <li className="listItem" onClick={ this.props.onClick }>
        { this.props.imgSrc ? 
          <div className="image-cropper">
            <img src={ this.props.imgSrc } alt={ this.props.imgAlt } />
          </div> : ''
        }
        <div className="itemText">
          <p className={ this.props.subText ? '' : 'centered' }>{ this.props.mainText }</p>
          { this.props.subText ? <p>{ this.props.subText }</p> : '' }
        </div>
        { icon }
      </li>
    );
  }
});

module.exports = PartyListItem;
