let validator = (validationStr, val) => {
  let typeArry = validationStr.split(':');
  let type = typeArry.shift();
  if (type === 'email') {
    return val.match(/.+@.+\..+/i) ? true :
      { msg: 'must be a valid email address' };
  } else if (type === 'minCharLen') {
    return val.length >= typeArry[0] ? true :
      { msg: `must be at least ${typeArry[0]} characters` }; 
  } else {
    return true;
  }
};

module.exports = validator;
