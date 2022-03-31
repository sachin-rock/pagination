const nodemailer = require("nodemailer")
let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "7738d5dcbfed19", // generated ethereal user
      pass: "60c71fdc0ed560", // generated ethereal password
    },
  });
module.exports = transporter;