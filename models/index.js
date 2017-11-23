if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize');

  var sequelize = null;
  if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      port: match[4],
      host: match[3],
      logging: true
    });
  } else {
    sequelize = new Sequelize('postgres://postgres:@localhost:5432/rusty');
  }
  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    PetOwner: sequelize.import(__dirname + '/petOwner'),
    Pet: sequelize.import(__dirname + '/pet'),
    Review: sequelize.import(__dirname + '/review'),
    Business: sequelize.import(__dirname + '/business'),
  };

  global.db.PetOwner.hasMany(global.db.Pet);
  global.db.PetOwner.hasMany(global.db.Review);
  global.db.Business.hasMany(global.db.Review);
}

module.exports = global.db;
