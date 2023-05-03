const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Note extends Model {}

Note.init(
    {
        note: {
            type: DataType.MEDIUMTEXT,
            allowNull: true
        },

    },
    {
        sequelize,
        timestamps: true
    }
);

module.exports = Note;