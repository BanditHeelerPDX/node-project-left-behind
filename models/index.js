const router = require('express').Router();
const bookmarkRoutes = require('./bookmarkRoutes');
const notesRoutes = require('./userRoutes');
const videoRoutes = require('./videoRoutes');

router.use('/bookmarks', bookmarkRoutes);
router.use('/notes', notesRoutes);
router.use('users', userRoutes);
router.use('/videos', videoRoutes);

module.exports = router;