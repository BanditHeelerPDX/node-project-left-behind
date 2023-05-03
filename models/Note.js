const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Note extends Model {}

Note.init(
    {
        note: {
            type: DataType.STRING,
            allowNull: true
        },

    },
    {
        sequelize,
    }
);

module.exports = Note;