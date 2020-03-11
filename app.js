//jshint esversion:6

require("dotenv").config();

const express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),
      ejs         = require("ejs"),
      middleware  = require("./middleware");
      content     = require("./content.js");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

let sentEmail = false;


//====================================================
// ROUTES
//====================================================

// DISPLAY HOME PAGE IN CZECH
app.get("/", (req, res) => {
  const pageContent = content.getCzContent();
  let sendBtn;
  if(!sentEmail) {
    sendBtn = content.getCzContent().contact[5];
  } else {
    sendBtn = content.getCzContent().contact[6];
    sentEmail = false;
  }
  res.render("home", {content: pageContent, sendBtn: sendBtn});
});

// DISPLAY HOME PAGE IN ENGLISH
app.get("/en", (req, res) => {
  const pageContent = content.getEnContent();
  let sendBtn;
  if(!sentEmail) {
    sendBtn = content.getEnContent().contact[5];
  } else {
    sendBtn = content.getEnContent().contact[6];
    sentEmail = false;
  }
  res.render("home", {content: pageContent, sendBtn: sendBtn});
});

// GET DATA FROM CZECH CONTACT FORM
app.post("/", middleware.sendMessage, (req, res) => {
  sentEmail = true;
  res.redirect("/");
});

// GET DATA FROM ENGLISH CONTACT FORM
app.post("/en", middleware.sendMessage, (req, res) => {
  sentEmail = true;
  res.redirect("/en");
});


//====================================================
// SERVER RUNNING
//====================================================

app.listen(process.env.PORT, function() {
  console.log("Zen to go server is running");
});
