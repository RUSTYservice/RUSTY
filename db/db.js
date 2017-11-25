const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rustydb', { useMongoClient: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to database!');
});

let petOwnerSchema = mongoose.Schema({
  // _id: auto-gen
  pet: String,
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  profileImg: String,
  // https://gist.github.com/aheckmann/2408370
  street: String,
  city: String,
  state: String,
  zip: String,
});


let businessSchema = mongoose.Schema({
  // _id: auto-gen
  businessName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  phone: String,
  businessCategory: String,
  profileImg: String,
  street: String,
  city: String,
  state: String,
  zip: String,
});

let reviewSchema = mongoose.Schema({
  // _id: auto-gen
  wags: Number,
  description: String,
  petOwnerId: String,
  businessId: String
});

let PetOwner = mongoose.model('PetOwner', petOwnerSchema);
let Business = mongoose.model('Business', businessSchema);
let Review = mongoose.model('Review', reviewSchema);

module.exports.PetOwner = PetOwner;
module.exports.Business = Business;
module.exports.Review = Review;
