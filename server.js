const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config()
require("colors")


//Function imports
const { getCurrentDateTime, getCurrentDate, getCurrentTime, getCurrentYear } = require("./src/general/Function/Util/GetTimeZone");
const { generateRandomId } = require("./src/general/Function/Util/RandomID");
// const { generateOrderID } = require("./src/general/Function/Util/OrderID");
const { formatDate } = require("./src/general/Function/Util/DateFormatter");
const sendEmail = require("./src/general/Function/Communitive/Email")
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
const prefix = 'Order';
const suffix = 'GH';
// Example usage:
let lastOrderId = undefined; // Initialize with undefined to create the first order ID
// let lastOrderId = 'ORDER-000000001-suffix';  // Set to the last order ID if available
// Generate an order ID
const orderID = generateOrderID(prefix, lastOrderId, suffix);
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
const emailHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Legal Letterhead</title>
    <!-- Link the external CSS file -->
      <style>
    /* Reset some default styles */
    body, h1, h2, p {
        margin: 5px;
        padding: 2px;
    }

    /* Define the letterhead container */
    .letterhead {
        /* background-color: #2c3e50; */
        /* color: #ffffff; */
        text-align: center;
        padding: 20px;
    }

    /* Style the law firm name */
    .firm-name {
        font-size: 35px;
        font-weight: bold;
    }

    /* Style the address and contact information */
    .firm-address {
        font-size: 20px;
        margin-top: 10px;
        font-weight: bold;
    }

    /* Style the header divider line */
    .divider {
        border-top: 2px solid #ffffff;
        margin: 10px 0;
    }

    /* Style the logo */
    .firm-logo {
        max-width: 200px; /* Adjust the size as needed */
        margin: 10px auto; /* Center the logo horizontally */
        display: block;
    }

    /* Define a class for the avatar effect */
    .avatar {
        border-radius: 50%; /* This creates a circular shape */
        background-image: url('Logo.jpg'); /* Set the background image */
        width: 120px; /* Adjust the width and height as needed */
        height: 120px; /* The dimensions determine the size of the circle */
        object-fit: cover; /* Ensures the image covers the circle without stretching */
        border: 2px solid #fff; /* Optional: Add a white border around the circle */
    }

    /* Add this CSS block inside the <head> section of your HTML document */
    .divider {
        height: 4px; /* Set the height of the divider */
        background-color: #000; /* Set the background color of the divider */
        margin: 40px 0; /* Set the top and bottom margins for spacing */
    }

    .lb1, .lb2, .lb3, .lb4, .lb5, .lb6, .lb7, .lb8, .bo1, .bo2, .bo3 {
        text-align: left;
        margin-left: 20px;
    }

    @media screen and (max-width: 768px) {
        .firm-name {
            font-size: 20px;
        }

        .firm-address {
            font-size: 12px;
        }

        .avatar {
            width: 80px;
            height: 80px;
        }

        .divider {
            margin: 20px 0;
        }
    }
  </style>
  </head>
  <body>
    <div class="letterhead">
      <img class="firm-logo avatar" src="Logo.jpg" alt="Law Firm Logo" />
      <div class="firm-name">Motorola LLC</div>
      <div class="firm-address">
        500 W Monroe Street, Ste 4400,<br />
        Chicago,<br />
        United States<br />
        Phone: (123) 456-7890<br />
        Email: info@smithlawfirm.com
      </div>
      <div class="divider"></div>
      <div class="letterbody">
        <div class="lb1">
          23/89, Derby Lane NGGO Colony Haryana 121002 <br />
          10th January, 2022<br />
                </div>
        
        <div class="lb2">
          The Editor The Indian Express Gurgaon Haryana - 121065<br />
          <br />
        </div>
        
        <div class="lb3">
          Subject: Conduction of offline examinations amidst the increasing COVID
          rates<br />
          <br />
        </div>
        
        <div class="lb4">
          Respected Sir/Ma’am,<br />
          <br />
        </div>
        <div class="bo1">
          I am Dhivya Dharshini, a member of the Parent-Teacher Association. I am
          writing in order to emphasize the decision to conduct offline
          examinations in schools and colleges when there is a huge increase in
          the number of COVID cases.<br />
          <br />
        </div>
        <div class="bo2">
          It is a matter of great concern that the disease is spreading sooner
          than ever in the past two years of the pandemic, and it is not safe for
          us to let our children travel to their respective schools and colleges
          to take up examinations in this situation. We have tried to discuss the
          issue with the authorities of the academic institutions, but no action
          or decision has been taken so far. It is the need of the hour to take
          utmost care and abstain from making any sort of physical contact with
          anyone in order to keep ourselves safe and healthy.<br />
          <br />
        </div>
        <div class="bo3">
        I request you to kindly understand the seriousness of this issue and
        highlight it in your newspaper so that the academic institutions
        consider conducting online examinations so that everyone stays safe.<br />
        <br />
      </div>
        
        <div class="lb5">
        Thanking you Yours sincerely,<br />
        <br />
      </div>
      <div class="lb6">
        Signature<br />
      </div>
      <div class="lb7">
        DHIVYA DHARSHINI<br />
      </div>
        <div class="lb8">
        Member of the Parent-Teacher Association<br />
      </div>
    </div>

    <!-- The rest of your legal document content goes here -->
  </body>
</html>

`;
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
