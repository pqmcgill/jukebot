let React = require('react');
let Vform = require('../shared/Vform');
let Vinput = require('../shared/Vinput');
let api = require('../../util/api');
let firebaseUtil = require('../../util/firebaseUtil');

let JoinParty = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  
  handleSubmit (model, cb) {
    model.partyId = this.props.params.partyId;
    model.uid = firebaseUtil.getSession().uid;
    api.joinParty(model).then((res) => {
      debugger;
      this.context.router.push('/parties/' + this.props.params.partyId);
    }, (err) => {
      console.log('ERROR', err);
      if (err.responseJSON && err.responseJSON.error === 'INCORRECT_PWD') {
        cb({ password: { msg: 'incorrect password' }});
      } else {
        cb({ form: { msg: 'unknown error occurred'}});
      }
    });
  },

  render () {
    return (
      <div className="component inParty">
        <h1>Join Party: { this.props.params.partyId }</h1>
        <Vform submit={ this.handleSubmit } submitBtnTxt="Join Party">
          <Vinput type="text"
            name="password"
            placeholder="party password"
            validation="required"
            type="password"
          />
        </Vform>
      </div>
    );
  }
});

module.exports = JoinParty;
