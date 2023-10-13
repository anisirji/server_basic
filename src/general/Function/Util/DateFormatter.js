const moment = require('moment');

function formatDate(userInputDate) {
    // Pad single-digit days and months with leading zeros
    const paddedDate = userInputDate.replace(/(\d{1,2})-(\d{1,2})-(\d{4})/, (_, day, month, year) => {
        return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
    });

    const parsedDate = moment(paddedDate, 'DD-MM-YYYY', true);

    if (parsedDate.isValid()) {
        const formattedDate = parsedDate.format('YYYY-MM-DD');
        return formattedDate;
    } else {
        return null;
    }
}

// console.log(formatDate("2-12-2020"));
// console.log(formatDate("24-12-2023"));


module.exports = { formatDate }