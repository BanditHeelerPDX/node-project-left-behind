const User = require('./User');
const Bookmark = require('./Bookmark');
const Note = require('./Note');
//const Video = require('./Video');


Bookmark.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: "CASCADE"
});

Bookmark.hasMany(Note, {
    foreignKey: 'bookmarkId',
    onDelete: "CASCADE"
});
Note.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: "CASCADE"
});
//User.hasMany(Bookmark, {
   // foreignKey: 'author',
//});


/*User.hasMany(Note, {
    foreignKey: 'author',
});*/


// User.hasMany(Video, {
//     foreignKey: 'author',
// });

//More associations to be added here - also, the ones I wrote need to be verified

module.exports = { User, Bookmark, Note };