const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rustydb', { useMongoClient: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to database!');
});

let userSchema = mongoose.Schema({
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

let ratingSchema = mongoose.Schema({
  // _id: auto-gen
  wags: Number,
  description: String,
  user_id: Number,
  business_id: Number,
});

let User = mongoose.model('User', userSchema);
let Business = mongoose.model('Business', businessSchema);
let Rating = mongoose.model('Rating', ratingSchema);

module.exports.User = User;
module.exports.Business = Business;
module.exports.Rating = Rating;
