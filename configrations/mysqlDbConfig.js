const mysql = require("mysql2/promise");

console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_USER_PASS,
  port: process.env.DB_PORT,
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_USER_PASS,
  port: process.env.DB_PORT,
});

const check = async () => {
  // try {
  const b = await pool.execute(`SELECT * FROM test`);
  console.log(
    "...10%\n.....30%\n......100%\n".white +
    "MySql".bgYellow.bold +
    " Database Server".magenta +
    " Connected Successfully".green
  );
  // } catch (e) {
  //   console.log(
  //     "\n...\n....\nDatabase Server Not connected, \nError: ".red.bold + e
  //   );
  // }
};
check();
module.exports = pool;

