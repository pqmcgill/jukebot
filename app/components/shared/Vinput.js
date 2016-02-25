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
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string,
    name: React.PropTypes.string.isRequired
  },

  getDefaultProps () {
    return {
      type: 'text'
    };
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
    this.validate(this);
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
        <span className="jb-input-error" key={i}>{ err.msg }</span>
      );
    });
    return (
      <div className="jb-input-container">
        <input type="text" 
          className="jb-input orange"
          onChange={ this.handleChange }
          onBlur={ this.handleBlur }
          placeholder={ this.props.placeholder }
          type={ this.props.type }
        />
        { errorMsgs }
      </div>
    );
  }
});

module.exports = Vinput;
