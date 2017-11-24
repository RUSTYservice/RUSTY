const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./models');
const http = require('http');
const bodyParser = require('body-parser');
const controllers = require('./controllers/controllers.js');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'dist')));
app.use(session({
  secret: 'meow',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/landing', (req, res) => {
  if (req.session && req.session.user) {
    res.send(req.session.user.userType);
  } else {
    res.send('is not logged in');
  }
});

// duplicate accordingly for user
app.post('/api/business/signup', (req, res) => {
  controllers.addBusiness(req.body, (newBusiness) => {
    req.session.regenerate((err) => {
      if (err) {
        return console.error(err);
      }
      req.session.user = newBusiness;
      console.log('hi');
      res.send('added business');
    });
  });
});
// duplicate accordingly for user
app.post('/api/petOwner/signup', (req, res) => {
  controllers.addPetOwner(req.body, (newPetOwner) => {
    req.session.regenerate((err) => {
      if (err) {
        return console.error(err);
      }
      req.session.user = newPetOwner;
      console.log('hi');
      res.send('added pet owner');
    });
  });
});

app.post('/api/login', (req, res) => {
  const cb = (user) => {
    controllers.validateLogin(req.body, user, () => {
      req.session.regenerate((err) => {
        if (err) {
          return console.error('Error regenerating session:', err);
        }
        req.session.user = user;
        res.send('validated');
      });
    });
  };
  if (req.body.userType === 'petOwner') {
    controllers.isPetOwnerInDatabase(req.body, cb);
  } else {
    controllers.isBusinessInDatabase(req.body, cb);
  }
});

app.get('/api/businessListings', (req, res) => {
  db.Business.findAll()
    .then((businesses) => {
      res.send(businesses);
    })
    .catch((err) => {
      return console.error(err);
    });
});

app.get('/*', (req, res) => {
  if (req.session && req.session.user) {
    res.redirect(`/profile/${req.session.user}`);
  } else {
    res.redirect('/');
  }
});

db.sequelize.sync().then(function() {
  http.createServer(app).listen(app.get('port'), function() {
    console.log('express listening on ', app.get('port'));
  });
});
