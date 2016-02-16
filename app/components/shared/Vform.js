let React = require('react');

let validator = require('../../util/validator');

let Vform = React.createClass({
  propTypes: {
    submit: React.PropTypes.func.isRequired,
    submitBtnTxt: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      submitBtnTxt: 'Submit'
    };
  },

  // Validate context types
  childContextTypes: {
    validate: React.PropTypes.func,
    attachToForm: React.PropTypes.func,
    detachFromForm: React.PropTypes.func
  },

  // create the context API to pass to children
  getChildContext () {
    return {
      validate: this.validateInput,
      attachToForm: this.attachToForm,
      detachFromForm: this.detachFromForm
    };
  },

  componentWillMount () {
    // initialize the nested input objects
    this.inputs = {};
    this.model = {};
  },

  // Update model on input change
  componentDidUpdate () {
    Object.keys(this.inputs).forEach((key) => {
      this.model[key] = this.inputs[key].state.val
    });
  },

  // Bind component to the form
  attachToForm (component) {
    console.log(component);
    this.inputs[component.props.name] = component;
  },

  // Unbind the component from the form
  detachFromForm (component) {
    delete this.inputs[component.props.name];
  },
  
  // Initialized the valid state to false
  getInitialState () {
    return {
      isAllValid: false,
      submitting: false,
      serverErrors: []
    };
  },

  doneSubmitting () {
    this.setState({
      submitting: false
    });
  },

  // form submission method -- pass this.model to
  // parent submit function.
  // handle errors and display necessary server error messages
  handleSubmit (e) {
    e.preventDefault();
    // set the form's state to submitting
    this.setState({
      submitting: true
    }, () => {
      // invoke the submit function
      this.props.submit(this.model, (err) => {
        // handle errors
        let key = Object.keys(err)[0];
        // either set the server error on the form
        console.log(key, err[key]);
        if (key === 'form') {
          this.setState({
            serverErrors: [err[key]]
            // finish submitting
          }, this.doneSubmitting);
        // or set the server error on the designated input
        } else {
          this.inputs[key].setState({
            serverErrors: [err[key]]
            // finish submitting
          }, this.doneSubmitting);
        }
      });
    });
  },

  // method passed to each vinput for handling individual validation
  validateInput (input) {
    // only validate the input if it declares any validation
    if (!input.props.validation) {
      return;
    }

    this.setState({
      serverErrors: []
    });

    //   only validate if the input has value or if it is required
      //   determine the validation requirements   
      let validation = input.props.validation;
      //   determine the input's value
      let val = input.state.val;

      // Loop through all validations,
      // if any fail
      //  build error object
      //  and set isValid to false
      let errors = [];
      let isValid = true;
      validation.split(',').forEach((v) => {
        let result;
        // check for match validation
        if (v.match(/^match/)) {
          let match = v.split(':')[1];
          result = validator(v, val, this.inputs[match].state.val);
        } else {
          let result = validator(v, val);
        }
        console.log(result);

        if (typeof(result) === 'object') {
          isValid = false;
          if (input.state.wasTouched && input.state.val.length > 0) {
            console.log(input.state.val);
            errors.push(result);
          }
        }
      });

      // Set the input component's state
      input.setState({
        isValid: isValid,
        errors: errors,
        serverErrors: []
        // run the validateForm method
      }, this.validateForm); 
  },

  // Method for validating the entire form
  validateForm () {
    // Initialize the new form state to true
    let isAllValid = true;
    // loop through all associated inputs.
    // read their states to determine overall form state
    Object.keys(this.inputs).forEach((key) => {
      // if any nested input fails, then fail the over all validation state
      if (!this.inputs[key].state.isValid) {
        isAllValid = false;
      }
    });
    // set the over all form's state
    this.setState({
      isAllValid: isAllValid
    });
  },

  render () {
    let formErrors = this.state.serverErrors.map((err, i) => {
      return (
        <span key={i} className="jb-input-error-lg">{ err.msg }</span>
      );
    });
    return (
      <form onSubmit={ this.handleSubmit }
        className="form">
        { formErrors }
        { this.props.children }
        <button 
          type="submit" 
          className="btn-primary orange"
          disabled={ this.state.submitting || !this.state.isAllValid }
        >
          { this.props.submitBtnTxt } 
        </button>
      </form>
    );
  }
});

module.exports = Vform;
