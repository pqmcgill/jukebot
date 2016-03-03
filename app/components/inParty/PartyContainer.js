let React = require('react');
let rhapsodyUtil = require('../../util/rhapsodyUtil');
let Link = require('react-router').Link;

let PartyContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillMount () {
    rhapsodyUtil.registerListener('error', this.handleRhapsodyError);
    rhapsodyUtil.registerListener('unauthorized', (e) => {
      console.log('unauthorized in component');
    });
    rhapsodyUtil.init(() => {
      console.log('party started');
    });
  },

  handleRhapsodyError (err) {
    // there was an unauthorized request
    if (err.data.code === 401) {
      rhapsodyUtil.destroyTokens();
      // TODO: display prompt to either re-authenticate or kill party
      rhapsodyUtil.authenticate();
    }
  },

  goToSearch (e) {
    e.preventDefault();
    this.context.router.push('search');
  },

  render () {
    let partyId = this.props.params.partyId;
    return (
      <div className="component home">
        <Link to={ '/parties/' + partyId + '/search' }>Search</Link>
        <Link to={ '/parties/' + partyId + '/nowPlaying' }>Now Playing</Link>
        <Link to={ '/parties/' + partyId + '/mySongs' }>My Songs</Link>
        { this.props.children }
      </div>
    );
  }
});

module.exports = PartyContainer;
