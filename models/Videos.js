const { Model, DataTypes } = require('sequelize');
const sequelize = require('..//config/connection');

class Video extends Model {}

Video.init(
   {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        }
    },
      video_format: {
        type: DataTypes.STRING,
        allowNull: false,
    },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
      upload_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
  },
    
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: 'video'
    });


module.exports = Video;