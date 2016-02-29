let React = require('react');

let Vform = require('../shared/Vform'),
  Vinput = require('../shared/Vinput');

let GenerateEmail = React.createClass({
  propTypes: {
    generateEmail: React.PropTypes.func
  },

  render () {
    return (
      <div>
        <Vform submit={ this.props.generateEmail } submitBtnTxt="Reset">
          <Vinput name="email"
            placeholder="email"
            validation="email"
          />
        </Vform>
      </div>
    );
  }
});

module.exports = GenerateEmail;
