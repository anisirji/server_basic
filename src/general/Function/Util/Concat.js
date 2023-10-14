function concat() {
  let concatenatedString = "";
  console.log(arguments);
  for (let i = 0; i < arguments.length; i++) {
    concatenatedString += arguments[i];
  }
  return concatenatedString;
}
console.log(concat("abcd", 25, "--"));
module.exports = { concat };
