const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model {}

Note.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        title: {
            type: DataTypes.STRING,
        content: DataTypes.STRING,
        allowNull: false,
    },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'username',
            },
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'note',
    }
);

module.exports = Note;