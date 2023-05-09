const router = require('express').Router();

//const apiRoutes = require('./api');
//const homeRoutes = require('./home');
//const dashRoutes = require('./dashboard');

//router.use('/api', apiRoutes);
//router.use('/', homeRoutes);
//router.use('/dashboard', dashRoutes);
router.get('/', (req, res) => {
    res.send("<h1>test</h1>");
})

module.exports = router;