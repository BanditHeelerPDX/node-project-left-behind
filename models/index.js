const User = require('./User');
const Bookmark = require('./Bookmark');
const Note = require('./Note');

User.hasMany(Bookmark, {
    foreignKey: 'author',
});

Bookmark.belongsTo(User, {
    foreignKey: 'author',
});

User.hasMany(Note, {
    foreignKey: 'author',
});

Note.belongsTo(User, {
    foreignKey: 'author',
});

//More associations to be added here

module.exports = { User, Bookmark, Note };