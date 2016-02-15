let React = require('react');

let Vform = require('./Vform');
let Vinput = require('./Vinput');

let Vformtest = React.createClass({
  submit (cb) {
    setTimeout(() => {
      cb({ 'email': { msg: 'this email has already been taken' }});
    }, 1000);
  },
  
  render () {
    return (
      <Vform submit={ this.submit }>
        Hello world
        <div>Form Test</div>
        <Vinput name="password" 
          required 
          validation="minCharLen:6" 
          placeholder="password"
        />
        <Vinput name="email" 
          required 
          validation="email" 
          placeholder="email"
        />
      </Vform>
    );
  }
});

module.exports = Vformtest;
