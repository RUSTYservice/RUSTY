const db = require('./db/db.js');
const businesses = require('./seeds/businesses.json');
const petOwners = require('./seeds/petOwners.json');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

// TODO: write review descriptions for dummy data
const descriptions = [
];

db.PetOwner.remove()
  .then(() => {
    return db.Business.remove();
  })
  .then(() => {
    return db.Review.remove();
  })
  .then(() => {
    return Promise.map(businesses, (datum) => {
      return bcrypt.hash(datum.password, 10)
        .then((hash) => {
          const business = new db.Business({
            businessName: datum.businessName,
            email: datum.email,
            password: hash,
            profileImg: datum.profileImg,
            phone: datum.phone,
            businessCategory: datum.businessCategory,
            street: datum.street,
            city: datum.city,
            state: datum.state,
            zip: datum.zip
          });
          return business.save((err) => {
            if (err) {
              return console.error(err);
            }
          });
        });
    })
  })
  .then(() => {
    return Promise.map(petOwners, (datum) => {
      return bcrypt.hash(datum.password, 10)
        .then((hash) => {
          const petOwner = new db.PetOwner({
            pet: datum.pet,
            username: datum.username,
            profileImg: datum.profileImg,
            email: datum.email,
            password: hash,
            street: datum.street,
            city: datum.city,
            state: datum.state,
            zip: datum.zip,
          });
          return petOwner.save((err) => {
            if (err) {
              return console.error(err);
            }
          });
        });
    });
  }).then(() => {
    console.log('done seeding, hit ctrl-c to exit');
  });
