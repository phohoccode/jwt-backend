'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1 user chỉ có 1 group
      User.belongsTo(models.Group)
      // 1 user thì có nhiều role thông qua bảng trung gian Project-User
      User.belongsToMany(models.Role, { through: 'Project_User' })
    }
  }
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    address:  DataTypes.STRING,
    sex:  DataTypes.STRING,
    phone:  DataTypes.STRING,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};