function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
}

function getCurrentDate() {
  const currentDate = new Date();
  return formatDate(currentDate);
}

function getCurrentTime() {
  const currentDate = new Date();
  return formatTime(currentDate);
}

function getCurrentDateTime() {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const formattedTime = formatTime(currentDate);
  return `${formattedDate} ${formattedTime}`;
}

function getCurrentYear() {
  const currentDate = new Date();
  return currentDate.getFullYear().toString();
}

module.exports = {
  getCurrentYear,
  getCurrentDate,
  getCurrentTime,
  getCurrentDateTime,
};
