const bodyParser = require('body-parser');
const db = require('../db/db');
const bcrypt = require('bcrypt');
const session = require('express-session');
const express = require('express');

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
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

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

app.post('/api/business/login', bodyParser(), (req, res) => {
  // if user/password pair corresponding to req.body does not match anything in db, notify user and keep them at login page
  // else regenerate session and send appropriate response
  db.Business.findOne({ username: req.body.username }, function (err, Business) {
    if (err) {
      return console.error(err);
    }
    bcrypt.compare(req.body.password, Business.password, function (error, response) {
      if (error) {
        return console.error(error);
      } else if (response) {
        req.session.regenerate(function (error1) {
          if (error1) {
            return console.error(error1);
          }
          req.session.user = Business;
          res.send('successful login');
        });
      }
    });
  });
});

app.get('/api/business/profile', (req, res) => {
  // if user is logged in, retrieve info from db and send back to client
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.send('not logged in');
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
