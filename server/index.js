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
  resave: true,
  saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// duplicate accordingly for user
app.post('/api/business/signup', (req, res) => {
  helpers.addBusiness(req.body, (newBusiness) => {
    req.session.regenerate(function (err) {
      if (err) {
        return console.error(err);
      }
      req.session.user = newBusiness;
      console.log('hi');
      res.send('added business');
    });
  });
});
app.post('/api/petOwner/signup', (req, res) => {
  helpers.addPetOwner(req.body, (newPetOwner) => {
    console.log('added new pet owner', newPetOwner);
    res.send('added new pet owner');
  });
});

/*
// run this to add test user
helpers.addPetOwner({
pet: 'rusty',
username: 'krista',
profileImg: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/11898737_10152912694381150_8438824989009173766_n.jpg?oh=5552c729aef988b48a95fd9585f8d8db&oe=5A9CA597',
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
    helpers.isPetOwnerInDatabase(req.body, (user) => {
      // if user found
      if (user) {
        helpers.validateLogin(req.body, user, (response) => {
          // if password matched
          if (response) {
            // regen session
            req.session.regenerate((err) => {
              // if problem regenerating session
              if (err) {
                console.log('problem regenerating session');
                res.end();
              // if all good, send user data back
              } else {
                res.json(user);
              }
            });
          // user found but password not matched
          } else {
            console.log('Password not matched');
            res.sendStatus(401);
          }
        });
      // user not found
      } else {
        console.log('Account not found');
        res.sendStatus(400);
      }
    });
  } else {
    helpers.isBusinessInDatabase(req.body, (user) => {
      // if user found
      if (user) {
        helpers.validateLogin(req.body, user, (response) => {
          // if password matched
          if (response) {
            // regen session
            req.session.regenerate((err) => {
              // if problem regenerating session <===== Need To Fix
              if (err) {
                console.log('problem regenerating session');
                res.end();
              // if all good, send user data back
              } else {
                res.json(user);
              }
            });
          // user found but password not matched
          } else {
            console.log('Password not matched');
            res.sendStatus(401);
          }
        });
      // user not found
      } else {
        console.log('Account not found');
        res.sendStatus(400);
      }
    });
  }
});

// for sessions check on page load
//Return the session value when the client checks
app.get('/api/checkSession', (req,res) => {
  if (req.session && req.session.user) {
    console.log("# Client Username check "+ req.session.user);
    //res.redirect(`/profile/${req.session.user}`);
    res.end(req.session.user)
  } else {
    res.end();
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

// app.get('/api/business/profile/')
// app.get('/api/dogowner/profile/')

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
