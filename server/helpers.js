const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const session = require('express-session');


// save petOwner to db and call callback on success
const addPetOwner = (data, callback) => {
  const petOwner = new db.User({
    pet: data.pet,
    username: data.username,
    profileImg: data.profileImg,
    email: data.email,
    password: data.password, // need to be hashing this
    street: data.street,
    city: data.city,
    state: data.state,
    zip: data.zip,
  });
  petOwner.save((err, document) => {
    if (err) {
      console.log('User not saved, possible duplicate');
      // console.log(err);
    } else {
      callback(document);
    }
  });
};

const hashPassword =
const addRating = function() {
}

const addBusiness = function() {
  let newBusiness = new Business(businessData);
};


const isPetOwnerInDatabase = (petOwner, callback) => {
  db.User.findOne({ email: petOwner.email }, (err, result) => {
    if (err) {
      return console.error('Error finding user in db:', err);
    } else {
      callback(result);
    }
  });
};

const isBusinessInDatabase = (business, callback) => {
  db.Business.findOne({ email: business.email }, (err, result) => {
    if (err) {
      return console.error('Error finding user in db:', err);
    } else {
      callback(result);
    }
  });
};


const validateLogin = (credentials, callback) => {
  bcrypt.compare(credentials.password, result.password, (err, response) => {
    if (err) {
      return console.error('Error validating password:', err);
    }
    if (response) {
      req.session.regenerate((err) => {
        if (err) {
          return console.error('Error regenerating session:', err);
        }
        req.session.user = response;
        callback();
      });
    }
  });
};



const fetchProfileData = () => {
};


module.exports.addPetOwner = addPetOwner;
module.exports.isPetOwnerInDatabase = isPetOwnerInDatabase;
module.exports.isBusinessInDatabase = isBusinessInDatabase;
module.exports.validateLogin = validateLogin;
module.exports.fetchProfileData = fetchProfileData;
module.exports.addBusiness = addBusiness;
module.exports.addRating = addRating;
