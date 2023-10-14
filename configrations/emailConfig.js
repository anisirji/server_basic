const nodemailer = require("nodemailer");
require("dotenv").config()

// Create a transporter using the email configuration
const email = nodemailer.createTransport({
    host: process.env.EM_HOST,
    port: process.env.EM_PORT,
    secure: true,
    auth: {
        user: process.env.EM_USER,
        pass: process.env.EM_USER_PASS,
    },
});

// Verify the connection to the email server
email.verify(function (error, success) {
    if (error) {
        console.error("Error connecting to the email server: " + error.message);
    } else {
        console.log("Email Server Connected.");
    }
});

module.exports = email