//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const https = require("https");
const encrypt = require("mongoose-encryption");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.ATLAS, {useNewUrlParser: true});


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

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
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
          DATETO: dateTo
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
