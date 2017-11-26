const bodyParser = require('body-parser');
const express = require('express');
const helpers = require('./helpers.js');

const port = process.env.PORT || 3000;
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// duplicate accordingly for user
app.post('/api/business/signup', (req, res) => {
  helpers.addBusiness(req.body, (newBusiness) => {
      res.send('added business');
    });
});

app.post('/api/petOwner/signup', (req, res) => {
  helpers.addPetOwner(req.body, (newPetOwner) => {
    console.log('added new pet owner', newPetOwner);
    res.send('added new pet owner');
  });
});

app.post('/api/login', (req, res) => {
  const callback = (user) => {
    // if user found
    if (user) {
      helpers.validateLogin(req.body, user, (response) => {
        // if password matched
        if (response) {
          // if all good, send user data back
          helpers.getReviews(user, (userTuple) => {
            res.json(userTuple);
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
  };
  if (req.body.userType === 'Pet Owner') {
    helpers.isPetOwnerInDatabase(req.body, callback);
  } else {
    helpers.isBusinessInDatabase(req.body, callback);
  }
});

app.get('/api/businessListings', (req, res) => {
  helpers.fetchBusinessListings((businessTuples) => {
    res.send(businessTuples);
  });
});

app.post('/api/review', (req, res) => {
  helpers.addReview(req.body, () => {
    res.send('added review');
  });
});

app.get('/*', (req, res) => {
  if (req.session && req.session.user) {
    res.redirect(`/profile/${req.session.user}`);
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
