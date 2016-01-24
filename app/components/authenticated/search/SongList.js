let React = require('react');

let SongList = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },

  render () {
    console.log(this.props);
    let songs = this.props.data.map((d, i) => {
      return (
        <li key={i}>{ d.name }</li>
      );
    });
    return (
      <div>
        <h2>Song List</h2>
        <ul>
          { songs }
        </ul>
      </div>
    );
  }
});

module.exports = SongList;
