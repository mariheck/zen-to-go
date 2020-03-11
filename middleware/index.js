// jshint esversion: 6


//====================================================
// NODEMAILER SETTING
//====================================================

const nodemailer  = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.ACCOUNT,
    pass: process.env.PASS
  }
});


//====================================================
// MIDDLEWARE METHODS
//====================================================

let middlewareObj = {};

middlewareObj.sendMessage = (req, res, next) => {
  const message = "<h1>Message from " + req.body.name +
    " </h1> <p>Email : " + req.body.email +
    "</p> <p>Subject : " + req.body.subject +
    "</p> <p>Message : " + req.body.message + "</p>";

  let mailOptions = {
    from: process.env.ACCOUNT,
    to: process.env.ACCOUNT,
    subject: "Zen to go // New message",
    html: message
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      console.log(err);
      res.redirect("back");
    } else {
      console.log("Email sent : " + info.response);
      next();
    }
  });
};

module.exports = middlewareObj;
