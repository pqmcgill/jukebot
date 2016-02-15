let React = require('react');

let Vinput = React.createClass({
  contextTypes: {
    validate: React.PropTypes.func,
    attachToForm: React.PropTypes.func,
    detachFromForm: React.PropTypes.func
  },

  propTypes: {
    validations: React.PropTypes.string,
    required: React.PropTypes.bool,
    placeholder: React.PropTypes.string
  },

  getInitialState () {
    return {
      val: this.props.val || '',
      isValid: false,
      errors: [],
      serverErrors: [],
      wasTouched: false
    };
  },

  componentWillMount () {
    this.context.attachToForm(this);
    this.setState({ isValid: !this.props.required });
  },

  componentWillUnmount () {
    this.context.detachFromForm(this);
  },

  handleChange (e) {
    this.setState({
      val: e.target.value
    }, this.validate); 
  },

  handleBlur (e) {
    this.setState({
      wasTouched: true
    }, this.validate);
  },

  validate () {
    this.context.validate(this);
  },

  render () {
    let errors = this.state.errors.concat(this.state.serverErrors);
    let errorMsgs = errors.map((err, i) => {
      return (
        <span key={i}>{ err.msg }</span>
      );
    });
    return (
      <div>
        <input type="text" 
          onChange={ this.handleChange }
          onBlur={ this.handleBlur }
          placeholder={ this.props.placeholder }
        />
        { errorMsgs }
      </div>
    );
  }
});

module.exports = Vinput;
