const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "takhirmunarbekov@gmail.com",
    pass: "tuinpylstgcpfllj"
  }
});

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(passport.initialize());

// require('./config/passport')(passport);

app.use(express.static("client/public/"));
app.use("/images/", express.static("../client/images"));
app.use("/fonts/", express.static("../client/style/fonts"));

app.post("/sendmail/", function(req, res) {
  console.log(req.body.mail);

  const msg = {
    to: "takhirmunarbekov@gmail.com",
    from: req.body.mail,
    subject: req.body.name + " (Проект с сайта)",
    text: req.body.msg + " | " + req.body.mail
  };

  transporter.sendMail(msg, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.send(true);
});

app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../client/public/")
  });
});

app.listen(port, () => {
  console.log(`SERVER RUNNNING ON PORT ${port}`);
});

module.exports = app;
