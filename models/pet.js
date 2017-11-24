module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pet', {
    name: DataTypes.STRING,
  });
};
