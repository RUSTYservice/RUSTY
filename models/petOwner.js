module.exports = (sequelize, DataTypes) => {
  return sequelize.define('PetOwner', {
    username: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
    password: DataTypes.STRING,
    profileImg: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
  });
};
