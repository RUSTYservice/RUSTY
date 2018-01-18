const db = require('../db/db.js');
const bcrypt = require('bcrypt');

// save petOwner to db and call callback on success
const addPetOwner = (data, callback) => {
  bcrypt.hash(data.password, 10, (err, hash) => {
    const petOwner = new db.PetOwner({
      pet: data.petName,
      username: data.name,
      profileImg: {
        cloudinaryURL: data.image,
      },
      email: data.email,
      password: hash,
      zip: data.zip,
    });
    writeToDatabase(petOwner, callback);
  });
};

const seedGallery = function (images) {
  images.map(image=> {
    businessSchema.galleryImages.push(image)
  })
}


const addBusiness = (data, callback) => {
  bcrypt.hash(data.password, 10, (err, hash) => {
    const business = new db.Business({
      galleryImages: {
        cloudinaryURL: data.gallery,
      },
      businessName: data.name,
      email: data.email,
      password: hash,
      profileImg: {
        cloudinaryURL: data.image,
      },
      profileVideo: {
        cloudinaryURL: data.video,
      },
      phone: data.phone,
      businessCategory: data.category,
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

const addPromotion = (data, callback) => {
  const promotion = new db.Promotion({
    description: data.promo,
    businessId: data.businessId
  });
  writeToDatabase(promotion, callback);
};

const writeToDatabase = (doc, callback) => {
  doc.save()
    .then((newDocument) => {
      callback(null, newDocument);
    })
    .catch((err) => {
      callback(err, null);
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


const fetchBusinessListings = (callback) => {
  const output = [];
  db.Business
    .find()
    .cursor()
    .eachAsync((business) => {
      return db.Review
        .find({ businessId: business._id })
        .then((reviews) => {
          // output.push([business, reviews]);
          return db.Promotion
            .find({ businessId: business._id })
            .then((promotions) => {
              output.push([business, reviews, promotions]);
            });
        });
    })
    .then(() => {
      callback(output);
    });
};

const fetchPetOwnerProfileData = (petOwnerEmail, callback) => {
  db.PetOwner.findOne({ email: petOwnerEmail }, (err, stored) => {
    if (err) {
      return console.error(err);
    } else {
      getReviews(stored, callback);
    }
  });
};

const fetchBusinessProfileData = (businessEmail, callback) => {
  db.Business.findOne({ email: businessEmail }, (err, stored) => {
    if (err) {
      return console.error(err);
    } else {
      getReviews(stored, callback);
    }
  });
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


const getPromotions = (businessTuple, callback) => {
  const output = [businessTuple];
  return db.Promotion
    .find({ businessId: businessTuple[0]._id })
    .then((promotions) => {
      businessTuple.push(promotions);
      callback(businessTuple);
    });
};
module.exports.addPetOwner = addPetOwner;
module.exports.isPetOwnerInDatabase = isPetOwnerInDatabase;
module.exports.isBusinessInDatabase = isBusinessInDatabase;
module.exports.validateLogin = validateLogin;
module.exports.fetchPetOwnerProfileData = fetchPetOwnerProfileData;
module.exports.fetchBusinessProfileData = fetchBusinessProfileData;
module.exports.fetchBusinessListings = fetchBusinessListings;
module.exports.addBusiness = addBusiness;
module.exports.addReview = addReview;
module.exports.addPromotion = addPromotion;
module.exports.getPromotions = getPromotions;
module.exports.findAndUpdatePetOwner = findAndUpdatePetOwner;
module.exports.getReviews = getReviews;
