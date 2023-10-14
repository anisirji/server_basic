const crypto = require("crypto");

function generateRandomId(name) {
  const randomId = crypto.randomBytes(20).toString("hex"); // 40 characters
  const combinedId = `${name}${randomId}`;
  return combinedId;
}
// console.log(generateRandomId("anikete"));
module.exports = { generateRandomId };
