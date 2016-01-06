const React = require('react');

const Toggle = React.createClass({

  propTypes: {
    options: React.PropTypes.array,
    onToggle: React.PropTypes.func
  },

  getInitialState () {
    return {
      selected: this.props.options[0] || ''
    };
  },

  handleChange (e) {
    let val = e.target.value;
    this.setState({
      selected: val
    });
    this.props.onToggle({
      val: val,
      index: parseInt(e.target.getAttribute('id').substring(
        val.length,
        val.length + 1
      )) 
    });
  },

  render () {
    let radioButtons = this.props.options.map((opt, i) => {
      return (
        <div key={ i } name={ i }>
          <input type='radio'
            name='toggle'
            className={ opt }
            id={ opt + i }
            value={ opt }
          />
          <label htmlFor={ opt + i }>{ opt }</label>
        </div>
      );
    }); 

    return (
      <div>
        <form onChange={ this.handleChange }>
          { radioButtons }
        </form>
      </div>
    );
  }
});

module.exports = Toggle;
