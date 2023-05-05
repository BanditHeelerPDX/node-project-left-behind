const router = require('express').Router();

const apiRoutes = require('./api/home');

router.use('/api', apiRoutes);

module.exports = router;
