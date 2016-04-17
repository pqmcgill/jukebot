let React = require('react');

let PartyListItem = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    imgSrc: React.PropTypes.string,
    imgAlt: React.PropTypes.string,
    mainText: React.PropTypes.string,
    subText: React.PropTypes.string,
    iconClass: React.PropTypes.string,
    onIconClick: React.PropTypes.func
  },

  render () {
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
        <i className={ this.props.iconClass } onClick={ this.props.onIconClick }></i>
      </li>
    );
  }
});

module.exports = PartyListItem;
