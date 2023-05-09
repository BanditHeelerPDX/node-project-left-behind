const { Model, DataTypes } = require('sequelize');
const sequelize = require('..//config/connection');

class Bookmark extends Model {}

Bookmark.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
      title: {
        type: DataTypes.STRING,
        allowNull: false
    },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    sequelize,
    modelName: 'bookmark',
    freezeTableName: true,
    modelName: 'bookmark', 
},



);


module.exports = Bookmark;