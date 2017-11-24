const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const session = require('express-session');


// save petOwner to db and call callback on success
const addPetOwner = (data, callback) => {
  bcrypt.hash(data.password, 10, (err, hash) => {
    let petOwner = new db.User({
      pet: data.pet,
      username: data.username,
      profileImg: data.profileImg,
      email: data.email,
      password: hash, // need to be hashing this
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
    });
    // petOwner.save((err, document) => {
    //   if (err) {
    //     console.log('User not saved, possible duplicate');
    //     // console.log(err);
    //   } else {
    //     callback(document);
    //   }
    // });
    writeToDatabase(petOwner, callback);
  });
};

const addBusiness = (data, callback) => {
  bcrypt.hash(data.password, 10, (err, hash) => {
    let newBusiness = new db.Business({
      businessName: data.businessName,
      email: data.email,
      password: hash,
      phone: data.phone,
      businessCategory: data.businessCategory,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
    });
    writeToDatabase(newBusiness, callback);
  });
};

const writeToDatabase = (document, callback) => {
  document.save()
    .then(function (newDocument) {
      callback(newDocument);
    }).catch(function (err) {
      console.log('wtf???');
      return console.error(err);
    });
};

const addRating = function() {
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


const validateLogin = (attempt, stored, callback) => {
  bcrypt.compare(attempt.password, stored.password, (err, response) => {
    if (err) {
      return console.error('Error validating password:', err);
    }
    if (response) {
      callback(stored);
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
