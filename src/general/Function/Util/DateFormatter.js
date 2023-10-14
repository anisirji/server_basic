const moment = require("moment");

function formatDate(userInputDate) {
  const parsedDate = moment(userInputDate, "D-M-YYYY", true);

  return parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : null;
}

module.exports = { formatDate };
