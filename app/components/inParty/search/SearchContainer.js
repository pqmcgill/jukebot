let React = require('react'),
	search = require('../../../util/rhapsodyMetaData').search;

let SearchContainer = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState () {
		return {
			query: '',
			data: []
		};
	},

	componentWillMount () {
		let query = this.props.location.query.q || '';
		this.setState({
			query: query
		});
	},

	handleChange (e) {
		let { q } = this.props.location.query;
		this.setState({
			query: q
		}, () => {
			if (this.state.query.length > 0) {
				this.context.router.replace('/parties/' + this.props.params.partyId + '/search/all?q=' + this.state.query);
			} else {
				this.context.router.replace('/parties/' + this.props.params.partyId + '/search');
			}	
		});
	},

	updateSearchType (type) {
		let { partyId, artistId, albumId } = this.props.params;
		let route = '/parties/' + partyId + '/search';
		if (type === 'artistId') {
			route += '/artists/' + artistId;
		} else if (type === 'albumId') {
			route += '/albums/' + albumId;
		} else {
			route += '/' + type;
		}
		this.context.router.replace(route + '?q=' + this.state.query);
	},

	render () {
		const { partyId, artistId, albumId } = this.props.params;
		switch (this.props.location.pathname) {
			case '/parties/' + partyId + '/search/all':
				break;
			case '/parties/' + partyId + '/search/tracks':
				break;
			case '/parties/' + partyId + '/search/artists':
				break;
			case '/parties/' + partyId + '/search/artists/' + artistId:
				break;
			case '/parties/' + partyId + '/search/albums':
				break;
			case '/parties/' + partyId + '/search/albums/' + albumId:
				break;
			default:
		}

		return (
			<div>
				<input onChange={ this.handleChange } value={ this.state.query }/>
			</div>
		);
	}
});

module.exports = SearchContainer;