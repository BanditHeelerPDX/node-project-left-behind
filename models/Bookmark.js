const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Bookmark extends Model {}

Bookmark.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
    },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
  }
);

module.exports = Bookmark;
