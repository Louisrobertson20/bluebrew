//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const https = require("https");
const encrypt = require("mongoose-encryption");
const nodemailer = require('nodemailer');
const { log } = console;
const mailGun = require('nodemailer-mailgun-transport');
const path = require('path');

const homeStartingContent = "Here you can keep up to date with what we have been up to and where. It is our aim to keep this page as updated as possible.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.ATLAS, {useNewUrlParser: true});

const auth = {
    auth: {
        api_key: process.env.API_KEY_MAILGUN,
        domain: process.env.DOMAIN
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (subject, text, cb) => {
    const mailOptions = {
        from: 'bluebrew2019@outlook.com',
        to: 'bluebrew2019@outlook.com',
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

app.post('/email', (req, res) => {
    const { subject, text } = req.body;
    log('Data: ', req.body);

    sendMail(subject, text, function(err, data) {
        if (err) {
            log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        log('Email sent!!!');
        return res.json({ message: 'Email sent!!!!!' });
    });
});

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

const User = new mongoose.model ("User", userSchema);

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/public/pages/index.html");
});

app.get("/cakes", function(req, res){
  res.sendFile(__dirname + "/public/pages/cakes.html");
});

app.get("/about", function(req, res){
  res.sendFile(__dirname + "/public/pages/about.html");
});

app.get("/contact", function(req, res){
  res.sendFile(__dirname + "/public/pages/contact.html");
});

app.get("/drinks", function(req, res){
  res.sendFile(__dirname + "/public/pages/drinks.html");
});

app.get("/eventhire", function(req, res){
  res.sendFile(__dirname + "/public/pages/event.html");
});

app.get("/menu", function(req, res){
  res.sendFile(__dirname + "/public/pages/menu.html");
});

app.get("/form-success", function(req, res){
  res.sendFile(__dirname + "/public/pages/success.html");
});

app.get("/form-failure", function(req, res){
  res.sendFile(__dirname + "/public/pages/failure.html");
});

app.get("/gallery", function(req, res){
  res.sendFile(__dirname + "/public/pages/gallery.html");
});

app.get("/testimonials", function(req, res){
  res.sendFile(__dirname + "/public/pages/testimonials.html");
});

app.get("/blog", function (req, res){
  Post.find({}, function(err, posts){
res.render("blog", {
  startingContent: homeStartingContent,
  posts: posts
});
});
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });

  newUser.save(function(err){
    if(err) {
      console.log(err);
    } else {
      res.render("login");
    }
  });
});

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if(err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("compose");
        }
      }
    }
    });
  });

app.post("/compose", function(req, res){
const post = new Post({
  title: req.body.postTitle,
  content: req.body.postBody
});

post.save(function(err){
  if (!err){
res.redirect("/blog");
}
});
});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});

app.post("/", function(req, res){
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = process.env.CUST_KEY;

  const options = {
    method: "POST",
    auth: process.env.API_KEY
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.render("success");
    } else {
      res.render("failure");
    }

    response.on("data", function(data){
    })
  })

  request.write(jsonData);
  request.end();

});

app.post("/about", function(req, res){
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = process.env.CUST_KEY;

  const options = {
    method: "POST",
    auth: process.env.API_KEY
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.render("success");
    } else {
      res.render("failure");
    }

    response.on("data", function(data){
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/cakes", function(req, res){
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = process.env.CUST_KEY;

  const options = {
    method: "POST",
    auth: process.env.API_KEY
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.render("success");
    } else {
      res.render("failure");
    }

    response.on("data", function(data){
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/contact", function(req, res){
  const email = req.body.email;
  const name = req.body.name;
  const enquiry = req.body.enquiry;
  const telephone = req.body.telephone;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          EMAIL: email,
          FNAME: name,
          PHONE: telephone,
          ENQUIRY: enquiry

        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = process.env.CUST_KEY;

  const options = {
    method: "POST",
    auth: process.env.API_KEY
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.render("success");
    } else {
      res.render("failure");
    }

    response.on("data", function(data){
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/drinks", function(req, res){
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = process.env.CUST_KEY;

  const options = {
    method: "POST",
    auth: process.env.API_KEY
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.render("success");
    } else {
      res.render("failure");
    }

    response.on("data", function(data){
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/eventhire", function(req, res){
  const name = req.body.name;
  const telephone = req.body.telephone;
  const business = req.body.business;
  const dateFrom = req.body.dateFrom;
  const dateTo = req.body.dateTo;
  const message = req.body.message;

  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          PHONE: telephone,
          BUSINESS: business,
          DATEFROM: dateFrom,
          DATETO: dateTo,
          MESSAGE: message
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = process.env.CUST_KEY;

  const options = {
    method: "POST",
    auth: process.env.API_KEY
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.render("success");
    } else {
      res.render("failure");
    }

    response.on("data", function(data){
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/menu", function(req, res){
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = process.env.CUST_KEY;

  const options = {
    method: "POST",
    auth: process.env.API_KEY
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.render("success");
    } else {
      res.render("failure");
    }

    response.on("data", function(data){
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/blog", function(req, res){
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = process.env.CUST_KEY;

  const options = {
    method: "POST",
    auth: process.env.API_KEY
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.render("success");
    } else {
      res.render("failure");
    }

    response.on("data", function(data){
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/posts:postID", function(req, res){
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = process.env.CUST_KEY;

  const options = {
    method: "POST",
    auth: process.env.API_KEY
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.render("success");
    } else {
      res.render("failure");
    }

    response.on("data", function(data){
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;}

app.listen(port, function() {
  console.log("Server started successfully");
});
