module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Business', {
    businessName: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
    password: DataTypes.STRING,
    businessCategory: DataTypes.STRING,
    phone: DataTypes.STRING,
    profileImg: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
  });
};
