const db = require('./db/db.js');
const businesses = require('./seeds/businessesCloudinary.json');
const petOwners = require('./seeds/petOwnersCloudinary.json');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

// TODO: write review descriptions for dummy data
const descriptionDummies = [
  'placeholder review 0',
  'placeholder review 1',
  'placeholder review 2',
  'placeholder review 3',
  'placeholder review 4',
];

const promotionDummies = [
  'Char siu bao for sale',
  'Happy hour 4 - 6 PM',
  'Two-dollar Tuesdays',
  'Buy two boba drinks, get one free',
  'Breakfast buffet 8 - 11 am on Sundays'
];

db.PetOwner.remove()
  .then(() => {
    return db.Business.remove();
  })
  .then(() => {
    return db.Review.remove();
  })
  .then(() => {
    return db.Promotion.remove();
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
        })
        .then((business) => {
          const promotion = new db.Promotion({
            businessId: business._id,
            description: promotionDummies[
              Math.floor(Math.random() * promotionDummies.length)
            ]
          })
          return promotion.save((err) => {
            if (err) {
              return console.error(err);
            }
          });
        });
    });
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
        })
        .then((petOwner) => {
          const rand = Math.floor(Math.random() * businesses.length);
          db.Business
            .find()
            .then((businesses) => {
              Promise.each(businesses, (business) => {
                const review = new db.Review({
                  wags: Math.floor(Math.random() * 5) + 1,
                  description: descriptionDummies[Math.floor(Math.random() * promotionDummies.length)],
                  petOwnerId: petOwner._id,
                  businessId: business._id
                });
                return review.save((err) => {
                  if (err) {
                    return console.error(err);
                  }
                });
              })
            })
        });
    });
  })
  .then(() => {
    console.log('done seeding, hit ctrl-c to exit');
  });
