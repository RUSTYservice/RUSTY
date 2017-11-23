const db = require('./models/index.js');
const data = require('./seeds/businesses.json');

db.Business.sync({ force: true }).then(() => {
  db.Business.bulkCreate(data);
}).then(() => {
  return db.Business.findAll();
}).then((businesses) => {
  console.log(businesses);
});
