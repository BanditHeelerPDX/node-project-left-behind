const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Note extends Model {}

Note.init(
    {
        note: {
            type: DataType.MEDIUMTEXT,
            allowNull: true
        },
        id: {
            type: DataType.INTEGER,
            allowNull: false
        },
        title: {
            type: DataType.TEXT
        },
        author: {
            type: DataType.TEXT
        },
        created_at: {
            timestamps: DEFAULT.CURRENT_TIMESTAMP
        }


    },
    {
        sequelize,
        timestamps: true
    }
);

module.exports = Note;