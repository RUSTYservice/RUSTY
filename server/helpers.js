const db = require('../db/db.js');
const bcrypt = require('bcrypt');

// save petOwner to db and call callback on success
const addPetOwner = (data, callback) => {
  bcrypt.hash(data.password, 10, (err, hash) => {
    const petOwner = new db.PetOwner({
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
    writeToDatabase(petOwner, callback);
  });
};

const seedGallery = function (images) { // **************
  images.map(image=> {
    businessSchema.galleryImages.push(image)
  })
} // **************


const addBusiness = (data, callback) => {
  bcrypt.hash(data.password, 10, (err, hash) => {
    const business = new db.Business({
      galleryImages : seedGallery (data.gallery), // **************** 
      businessName: data.businessName,
      email: data.email,
      password: hash,
      profileImg: data.profileImg,
      phone: data.phone,
      businessCategory: data.businessCategory,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip
    });
    writeToDatabase(business, callback);
  });
};



const addReview = (data, callback) => {
  const review = new db.Review({
    wags: data.wags,
    description: data.description,
    petOwnerId: data.petOwnerId,
    businessId: data.businessId
  });
  writeToDatabase(review, callback);
};

const writeToDatabase = (document, callback) => {
  document.save()
    .then(function (newDocument) {
      callback(newDocument);
    }).catch(function (err) {
      return console.error(err);
    });
};

const isPetOwnerInDatabase = (petOwner, callback) => {
  db.PetOwner.findOne({ email: petOwner.email }, (err, result) => {
    if (err) {
      console.log('Error finding user in db:', err);
      callback();
    } else {
      callback(result);
    }
  });
};

const isBusinessInDatabase = (business, callback) => {
  db.Business.findOne({ email: business.email }, (err, result) => {
    if (err) {
      console.log('Error finding user in db:', err);
      callback();
    } else {
      callback(result);
    }
  });
};

const findAndUpdatePetOwner = (petOwner, update, callback) => {
  db.PetOwner.findOneAndUpdate({ email: petOwner.email }, update, (err, result) => {
    if (err) {
      return console.error(err);
    }
    callback(result);
  });
};

const validateLogin = (attempt, stored, callback) => {
  bcrypt.compare(attempt.password, stored.password, (err, response) => {
    if (response) {
      callback(stored);
    } else {
      console.log('Error validating password');
      callback();
    }
  });
};

// the eachAsync callback ought to be easily modularized...but i can't do that for some reason
const fetchBusinessListings = (callback) => {
  const output = [];
  db.Business
    .find()
    .cursor()
    .eachAsync((business) => {
      return db.Review
        .find({ businessId: business._id })
        .then((reviews) => {
          output.push([business, reviews]);
        });
    })
    .then(() => {
      callback(output);
    });
};

const fetchPetOwnerProfileData = (callback) => {
};

const getReviews = (doc, callback) => {
  const output = [doc];
  return db.Review
    .find({ [doc.collection.name.slice(0, -1) + 'Id']: doc._id })
    .then((reviews) => {
      output.push(reviews);
      callback(output);
    });
};

module.exports.addPetOwner = addPetOwner;
module.exports.isPetOwnerInDatabase = isPetOwnerInDatabase;
module.exports.isBusinessInDatabase = isBusinessInDatabase;
module.exports.validateLogin = validateLogin;
module.exports.fetchPetOwnerProfileData = fetchPetOwnerProfileData;
module.exports.fetchBusinessListings = fetchBusinessListings;
module.exports.addBusiness = addBusiness;
module.exports.addReview = addReview;
module.exports.findAndUpdatePetOwner = findAndUpdatePetOwner;
module.exports.getReviews = getReviews;
