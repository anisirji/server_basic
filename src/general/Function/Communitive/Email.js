const email = require("../../../../configrations/emailConfig");
const { readFileData } = require("./getHtmlFile.js")


// Function to send an email with a message configurator
async function sendEmail(to, subject, text, html) {

  const mailOptions = {
    from: process.env.EM_USER,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  const sentMail = await email.sendMail(mailOptions);
  console.log(sentMail);
}


const check = async () => {
  const abc = await readFileData(__dirname, "./MailFiles/basicFormat.html")
  console.log(abc);
  const sendMail = await sendEmail("www.allinoneforyouhere@gmail.com", "sdaf", "asf", abc)
  console.log(
    sendMail
  );
}

check()
module.exports = sendEmail;
