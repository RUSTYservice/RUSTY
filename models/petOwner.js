module.exports = (sequelize, DataTypes) => {
  return sequelize.define('PetOwner', {
    username: { type: DataTypes.STRING, unique: true },
    email: {type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    profileImg: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
  });
}
