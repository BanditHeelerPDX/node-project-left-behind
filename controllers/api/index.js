const router = require('express').Router();

const bookmarkRoutes = require('./bookmarks')
const noteRoutes = require('./notes')
const userRoutes = require('./users')

router.use('/bookmarks', bookmarkRoutes);
router.use('/notes', noteRoutes);
router.use('/users', userRoutes);

module.exports = router;