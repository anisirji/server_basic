

// 2) get Current Date Time  // "2023-10-11 09:56:34"
// 3) Current  Time //"09:57:34"
// 4) Current Date // "2023-10-11"
// 5) Current Year //"2023'

function getCurrentYear() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    // Create a formatted string for the date
    const formattedYear = `${year}`;
    return formattedYear;
}


function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = currentDate.getDate();

    // Create a formatted string for the date
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;

}

function getCurrentDateTime() {

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime

}
function getCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Create a formatted string for the time
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
}

// console.log(getCurrentDate(), getCurrentDateTime(), getCurrentTime(), getCurrentYear());

module.exports = { getCurrentYear, getCurrentDate, getCurrentTime, getCurrentDateTime };

