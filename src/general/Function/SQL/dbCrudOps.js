const pool = require("../../../../configrations/mysqlDbConfig");

/**
 * Inserts data into the database.
 * @param {string} table - The table name.
 * @param {Array} fields - An array of field names.
 * @param {Array} values - An array of corresponding field values.
 * @returns {Object} - The result object indicating success or failure.
 */
async function writeDb(table, fields, values) {
  const sql = `INSERT INTO ${table} (${convertToSql(
    fields,
    "n"
  )}) VALUES (${convertToSql(values, "c")})`;
  console.log(sql, values);

  console.log("Inserting data into table: ".yellow.bold + table);
  // console.log(sql.yellow, values);

  // try {
  const f = await pool.execute(sql, values);
  return {
    flag: true,
    message: "Data inserted successfully",
    response: f,
    // };
    // } catch (e) {
    // console.log(`Encountered error: ${e.message}`.red);
    // return {
    //   flag: false,
    //   message: `Encountered error: ${e.message}`,
    // };
  };
}

/**
 * Reads data from a table with a specific condition.
 * @param {string} table - The table name.
 * @param {Object} condition - The condition object containing field and value.
 * @returns {Object} - The result object with data or failure message.
 */
async function readDbs(table, condition) {
  const { field, value } = condition;
  const sql = `SELECT * FROM ${table} WHERE ${field}='${value}'`;

  try {
    const ff = await pool.execute(sql);
    const [data, info] = ff;

    if (data.length > 0) {
      return {
        flag: true,
        message: "Successfully fetched the data",
        data: data,
      };
    } else {
      return {
        flag: false,
        message: "No data found",
      };
    }
  } catch (e) {
    console.log(`Encountered error: ${e.message}`.red);
    return {
      flag: false,
      message: `Encountered error: ${e.message}`,
    };
  }
}

/**
 * Reads entire table data.
 * @param {string} table - The table name.
 * @returns {Object} - The result object with data or failure message.
 */
async function readDb(table) {
  const sql = `SELECT * FROM ${table}`;

  try {
    const ff = await pool.execute(sql);
    const [data, info] = ff;
    if (data.length > 0) {
      return {
        flag: true,
        message: "Successfully fetched the data",
        data: data,
      };
    } else {
      return {
        flag: false,
        message: "No data found",
      };
    }
  } catch (e) {
    console.log(`Encountered error: ${e.message}`.red);
    return {
      flag: false,
      message: `Encountered error: ${e.message}`,
    };
  }
}

/**
 * Converts an array of data into SQL commands.
 * @param {Array} data - The array of data.
 * @param {string} l - The conversion type ("n" for field names, "c" for field values).
 * @returns {string} - The SQL command string.
 */
const convertToSql = (data, l) => {
  if (l === "n") {
    return data.join(",");
  } else {
    return "?".repeat(data.length).split("").join(",");
  }
};

/**
 * Executes an SQL query and returns the response.
 * @param {string} query - The SQL query.
 * @returns {Object} - The query response or failure message.
 */
async function runQuary(query) {
  try {
    const response = await pool.execute(query);
    return response;
  } catch (e) {
    console.log(e);
    return { flag: false, message: `Error found: ${e.message}` };
  }
}

/**
 * Updates values in a table based on a condition.
 * @param {string} table - The table name.
 * @param {Object} updates - The object containing field-value pairs to update.
 * @param {Object} condition - The condition object containing field and value.
 * @returns {Object} - The result object indicating success or failure.
 */
async function updateDb(table, updates, condition) {
  let updts = "";
  for (const key in updates) {
    updts += `${key} = '${updates[key]}',`;
  }
  updts = updts.substring(0, updts.length - 1);
  const sql = `UPDATE ${table} SET ${updts} WHERE ${condition.field} = '${condition.value}'`;

  try {
    const response = await pool.execute(sql);
    return {
      flag: true,
      message: "Data updated successfully",
    };
  } catch (e) {
    return {
      flag: false,
      message: `Error: ${e}`,
    };
  }
}

module.exports = { writeDb, readDb, readDbs, runQuary, updateDb };
