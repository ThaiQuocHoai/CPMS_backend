'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id'})
    }
  }
  Address.init({
    city: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: "City must have 5 - 100 characters"
        }
      }
    },
    district: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: "District must have 5 - 100 characters"
        }
      }
    },
    sub_district: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: "Sub-district must have 5 - 100 characters"
        }
      }
    },
    street: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: "Street must have 5 - 100 characters"
        }
      }
    },
    isDefault: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};