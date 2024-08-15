'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // 1 Group thì sẽ có nhiều User
            Group.hasMany(models.User)
            // 1 Group có nhiều Role thông qua bảng trung gian là Group_role
            Group.belongsToMany(models.Role, { through: 'Group_Role' })
        }
    }
    Group.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Group',
    });
    return Group;
};