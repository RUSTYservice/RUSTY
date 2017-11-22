const bodyParser = require('body-parser');
const db = require('../db/db');
const bcrypt = require('bcrypt');
const session = require('express-session');
const express = require('express');
const helpers = require('./helpers.js');

const port = process.env.PORT || 3000;
const app = express();
const path = require('path');

app.use(session({
  secret: 'meow',
  resave: false,
  saveUninitialized: false,
}));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// duplicate accordingly for user
app.post('/api/business/signup', bodyParser(), (req, res) => {
  // if username corresponding to req.body already exists, don't save to db; notify user
  // else save to db and regenerate session; notify user with success
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      return console.error(err);
    }
    const NewBusiness = new db.Business({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
      businessCategory: req.body.businessCategory,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    });
    NewBusiness.save()
      .then(function (Business) {
        req.session.regenerate(function (error) {
          if (error) {
            return console.error(error);
          }
          req.session.user = Business;
          res.send('successful signup');
        });
      })
      .catch(function (err) {
        res.send('user already exists');
      });
  });
});

/*
// run this to add test user
helpers.addPetOwner({
pet: 'rusty',
username: 'krista',
profileImg: 'https://scontent.fewr1-1.fna.fbcdn.net/v/t1.0-9/11898737_10152912694381150_8438824989009173766_n.jpg?oh=5552c729aef988b48a95fd9585f8d8db&oe=5A9CA597',
email: 'abrakd@yahoo.com',
password: 'moo',
street: '22 abc street',
city: 'Portland',
state: 'OR',
zipcode: '97203'
},
(data) => console.log(data, 'added'));
*/


app.post('/api/login', (req, res) => {
  if (req.body.userType === 'petOwner') {
    helpers.isPetOwnerInDatabase(req.body, (petOwner) => {
      // need to incorporate bcrypt hashing on user save and retrieval
      // and sessions with validateLogin helper function
      // helpers.validateLogin(petOwner, (response) => {

      if (req.body.password === petOwner.password) {
        res.send(200);
      } else {
        res.send(404);
      }
    });
  } else {
    helpers.isBusinessInDatabase(req.body, (business) => {
      // need to incorporate bcrypt hashing on user save and retrieval
      // and sessions with validateLogin helper function
      // helpers.validateLogin(business, (response) => {

      if (req.body.password === business.password) {
        res.send(200);
      } else {
        res.send(404);
      }
    });
  }
});

app.get('/api/business/profile', (req, res) => {
  // if user is logged in, retrieve info from db and send back to client
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.send('not logged in');
  }
});

app.get('/api/businessListings', (req, res) => {
  db.Business.find({}, (err, businesses) => {
    if (err) {
      return console.error(err);
    }
    res.send(businesses);
  });
});

app.get('/*', (req, res) => {
  if (req.session && req.session.user) {
    res.redirect(`/profile/${req.session.user}`);
  } else {
    res.redirect('/');
  }
});
//app.post('/api/business/login')
// app.get and validate business credentials

//app.post('/api/dogowner/login')
// app.get and validate dogowner credentials

// app.get('/api/business/profile/')
// app.get('/api/dogowner/profile/')

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
