let React = require('react');
let Link = require('react-router').Link;

let ReactFireMixin = require('reactfire');
let rhapsodyUtil = require('../../util/rhapsodyUtil');
let firebaseUtil = require('../../util/firebaseUtil');

let Vform = require('../shared/Vform');
let Vinput = require('../shared/Vinput');

let Tray = require('../shared/Tray');
let api = require('../../util/api');

let CreateParty = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      trayShown: false,
      model: {}
    };
  },

  createParty (model, cb) {
    // handle party creation here
    api.createParty({
      displayName: model.partyName,
      pwd: model.password,
      uid: firebaseUtil.getSession().uid
    }).then(
      (data) => {
        this.setState({
          trayShown: true,
          model: model
        }, () => {
          cb();
        });
      },
      (err) => {
        console.log('error creating party', err);
      }
    );
  },

  render () {
    return (
      <div className="component home">
        <Vform submit={ this.createParty } submitBtnTxt="Create!">
          <Vinput type="text"
            placeholder="party name"
            validation="minCharLen:6"
            name="partyName"
          />
          <Vinput type="password"
            placeholder="party password"
            validation="required"
            name="password"
          />
          <Vinput type="password"
            placeholder="confirm password"
            validation="match:password,required"
            name="passwordConfirmation"
          />
        </Vform>
        <Tray shown={ this.state.trayShown }>
          <h1>Success!</h1>
          <Link to={ '/parties/' + this.state.model.partyName }>Start the party</Link>
        </Tray>
      </div>
    );
  }
});

module.exports = CreateParty;

// Removed text from tray for now
// <p>You're almost ready to party!</p>
// <p><a>Share the party link with friends</a></p>
