'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1 Project thì có nhiều Role thông qua bảng trung gian là Project_User
      Project.belongsToMany(models.Role, { through: 'Project_User' })
    }
  }
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.STRING,
    address:  DataTypes.STRING,
    customerId:  DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};