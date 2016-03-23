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
    let { partyId } = this.props.params;
    return (
      <div className="component inParty no-padding">
        <div className="tabs">
          <Link className="tab" activeClassName="active" to={ '/parties/' + partyId + '/menu' }>MENU</Link>
          <Link className="tab" activeClassName="active" to={ '/parties/' + partyId + '/search' }>Search</Link>
          <Link className="tab" activeClassName="active" to={ '/parties/' + partyId + '/nowPlaying' }>Now Playing</Link>
          <Link className="tab" activeClassName="active" to={ '/parties/' + partyId + '/mySongs' }>SongList</Link>
        </div>
        { this.props.children }
      </div>
    );
  }
});

module.exports = PartyContainer;
