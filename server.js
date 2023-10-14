const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config()
require("colors")
require("./configrations/emailConfig")


//Function imports
const { getCurrentDateTime, getCurrentDate, getCurrentTime, getCurrentYear } = require("./src/general/Function/Util/GetTimeZone");
const { generateRandomId } = require("./src/general/Function/Util/RandomID");
// const { generateOrderID } = require("./src/general/Function/Util/OrderID");
const { formatDate } = require("./src/general/Function/Util/DateFormatter");
// const { sendMail } = require("./configrations/emailConfig");
// require("./configrations/mysqlDbConfig");
// const concat = require("./src/general/Function/Util/demo");

const app = express();

//XSS protection --- Cross-Site-Scripting
app.use(
  helmet({
    poweredBy: false,
    noCache: true,
    frameguard: { action: "deny" },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the actual frontend URL
    credentials: true,
  })
);

//Limit Brute Force Attack
app.use(
  rateLimit({
    //min*seconds*miliseconds
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15 * 120, // Limit to 5 requests per windowMs
    message: "Too many api req from this ip pls come later",
  })
);

//Sanitize user input to prevent XSS and low request url
app.use((req, res, next) => {
  console.log("Request--->", req.url);
  req.body = xss(req.body);
  next();
});

app.use(express.json({ limit: "5mb", extended: true }));
app.use(
  express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());

///////////////////////////////////////////////////////

//TimeZone
app.get("/year", (req, res) => {
  res.send(getCurrentYear())
})

app.get("/date", (req, res) => {
  res.send(getCurrentDate())
})

app.get("/time", (req, res) => {
  res.send(getCurrentTime())
})

app.get("/datetime", (req, res) => {
  res.send(getCurrentDateTime())
})

//RandomID.js
app.get("/randomid/:name", (req, res) => {
  const { name } = req.params;
  const combinedId = generateRandomId(name);
  res.json({ id: combinedId });
})

//OrderID.js
app.get("/orderid", (req, res) => {
  const orderID = generateOrderID();
  res.json({ orderID });
})
// Define a prefix and suffix for your order IDs.
// const prefix = 'Order';
// const suffix = 'GH';
// // Example usage:
// let lastOrderId = undefined; // Initialize with undefined to create the first order ID
// // let lastOrderId = 'ORDER-000000001-suffix';  // Set to the last order ID if available
// // Generate an order ID
// const orderID = generateOrderID(prefix, lastOrderId, suffix);
// console.log(orderID);


//DateFormatter.js
app.get('/dateformat', (req, res) => {
  const userInputDate = req.query.date; // Use req.query to access query parameters

  const formattedDate = formatDate(userInputDate);

  if (formattedDate) {
    res.status(200).json({ formattedDate });
  } else {
    res.status(400).json({ error: 'Invalid date format. Please use - DD-MM-YYYY' });
  }
});

//Email basic format (this is also working)
// sendEmail(
//   "aniketofficial2003@gmail.com",
//   "Hello, World!",
//   "This is a plain text message.",
//   "<h1>This is an HTML message.</h1>"
// );

//Email Predifined Structure of The Mail with html and css (this one is also working but diff approach)
const emailHTML = "k";
//This Part send mail takes mailid,subject etc.. and send mail
// sendEmail(
//   "aniketofficial2003@gmail.com",
//   "Legal Document",
//   "This is a plain text message.",
//   emailHTML
// );


//
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server Not Started", "Some Error Occurred");
  }
  console.log("Server started at localhost:" + PORT);
});
