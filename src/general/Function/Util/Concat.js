function concat() {
  let concatenatedString = "";
  for (let i = 0; i < arguments.length; i++) {
    concatenatedString += arguments[i];
  }
  return concatenatedString;
}

module.exports = { concat };
