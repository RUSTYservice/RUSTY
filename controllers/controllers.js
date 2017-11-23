const db = require('../models/index.js');
const bcrypt = require('bcrypt');

const addPetOwner = (data, callback) => {
  bcrypt.hash(data.password, 10, (err, hash) => {
    if (err) {
      return console.error(err);
    }
    db.PetOwner.create({
      // pet to be added
      username: data.username,
      profileImg: data.profileImg,
      email: data.email,
      password: hash, // need to be hashing this
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
    })
      .then((petOwner) => {
        return db.Pet.bulkCreate(data.pets).then((pets) => {
          return petOwner.setPets(pets).then(() => {
            callback(petOwner);
          });
        });
      })
      .catch((err) => {
        return console.error(err);
      });
  });
};

const addBusiness = (data, callback) => {
  bcrypt.hash(data.password, 10, (err, hash) => {
    if (err) {
      return console.error(err);
    }
    db.Business.create({
      businessName: data.businessName,
      email: data.email,
      password: hash,
      phone: data.phone,
      businessCategory: data.businessCategory,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
    })
      .then((business) => {
        callback(business);
      })
      .catch((err) => {
        return console.error(err);
      });
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

const isPetOwnerInDatabase = (petOwner, callback) => {
  db.PetOwner.findOne({ where: { email: petOwner.email } })
    .then((stored) => {
      callback(stored);
    });
};
const isBusinessInDatabase = (business, callback) => {
  db.Business.findOne({ where: { email: business.email } })
    .then((stored) => {
      callback(stored);
    });
};

// const addPet = (data, callback) => {
//   bcrypt.hash(data.password, 10, (err, hash) => {
//     if (err) {
//       return console.error(err);
//     }
//     db.Pet.create({
//       name: data.name
//     });
//       .then(pet => {
//         callback(pet);
//       })
//       .catch(err => {
//         return console.error(err);
//       });
//   });
// };

module.exports.addPetOwner = addPetOwner;
module.exports.addBusiness = addBusiness;
module.exports.validateLogin = validateLogin;
module.exports.isPetOwnerInDatabase = isPetOwnerInDatabase;
module.exports.isBusinessInDatabase = isBusinessInDatabase;
