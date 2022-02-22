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
    static associate({ Address }) {
      // define association here
      this.hasMany(Address, {foreignKey: 'user_id'})
    }
  }
  User.init({
    fullname: {
      type: DataTypes.STRING,
      validate: {
        fullnameValidation (value) {
          if(!value || value.length < 5 || value.length > 50){
            throw new Error("Fullname must have 5 - 50 characters")
          }
        }
      }
    },

    phone_number: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [10, 10],
          msg: "Phone number must have 10 number"
        }
      }
    },
    gender: DataTypes.BOOLEAN,
    birthdate: {
      type: DataTypes.DATE,
    },
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};