let validator = (validationStr, val, match) => {
  let typeArry = validationStr.split(':');
  let type = typeArry.shift();
  if (type === 'email') {
    return val.match(/.+@.+\..+/i) ? true :
      { msg: 'must be a valid email address' };
  } else if (type === 'minCharLen') {
    return val.length >= typeArry[0] ? true :
      { msg: `must be at least ${typeArry[0]} characters` }; 
  } else if (type === 'match' && match) {
    return val === match ? true :
      { msg: `${typeArry[0]} does not match` };
  } else if (type === 'required') {
    return val.length > 0 ? true :
      { msg: `${typeArry[0]} is required` };
  } else {
    return true;
  }
};

module.exports = validator;
