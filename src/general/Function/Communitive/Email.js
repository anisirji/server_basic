const nodemailer = require("nodemailer");

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

// Function to send an email with a message configurator
function sendEmail(to, subject, text, html) {
  const mailOptions = {
    from: process.env.EM_USER,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  email.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email: " + error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmail;
