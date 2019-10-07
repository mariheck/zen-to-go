//jshint esversion:6

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const content = require(__dirname + "/content.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let sentEmail = false;


// NODEMAILER SETTING
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.ACCOUNT,
    pass: process.env.PASS
  }
});


// DISPLAY HOME PAGE
app.get("/", function(req, res) {
  if(!sentEmail) {
    res.render("home", {content: content.getCzContent(), sendBtn: content.getCzContent().contact[5]});
  } else {
    sentEmail = false;
    res.render("home", {content: content.getCzContent(), sendBtn: content.getCzContent().contact[6]});
  }
});

app.get("/en", function(req, res) {
  if(!sentEmail) {
    res.render("home", {content: content.getEnContent(), sendBtn: content.getEnContent().contact[5]});
  } else {
    sentEmail = false;
    res.render("home", {content: content.getEnContent(), sendBtn: content.getEnContent().contact[6]});
  }
});


// CONTACT FORM
app.post("/", function(req, res) {

  const message = "<h1>Message from " + req.body.name +
    " </h1> <p>Email : " + req.body.email +
    "</p> <p>Subject : " + req.body.subject +
    "</p> <p>Message : " + req.body.message + "</p>";

  var mailOptions = {
    from: process.env.ACCOUNT,
    to: process.env.ACCOUNT,
    subject: "Zen to go // New message",
    html: message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
      res.redirect("/");
    } else {
      console.log("Email sent : " + info.response);
      sentEmail = true;
      res.redirect("/");
    }
  });

});

app.post("/en", function(req, res) {

  const message = "<h1>Message from " + req.body.name +
    " </h1> <p>Email : " + req.body.email +
    "</p> <p>Subject : " + req.body.subject +
    "</p> <p>Message : " + req.body.message + "</p>";

  var mailOptions = {
    from: process.env.ACCOUNT,
    to: process.env.ACCOUNT,
    subject: "Zen to go // New message",
    html: message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
      res.redirect("/en");
    } else {
      console.log("Email sent : " + info.response);
      sentEmail = true;
      res.redirect("/en");
    }
  });

});


// SERVER RUNNING
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
});
