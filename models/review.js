module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Review', {
    wags: DataTypes.INTEGER,
    description: DataTypes.STRING
  });
}
