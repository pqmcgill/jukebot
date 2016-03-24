let React = require('react');
let Vform = require('../shared/Vform');
let Vinput = require('../shared/Vinput');
let api = require('../../util/api');
let firebaseUtil = require('../../util/firebaseUtil');

let JoinParty = React.createClass({
  handleSubmit (model) {
    model.partyId = this.props.params.partyId;
    model.uid = firebaseUtil.getSession().uid;
    api.joinParty(model).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
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
