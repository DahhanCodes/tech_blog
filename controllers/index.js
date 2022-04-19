//bringing in all routes
const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const router = require('express').Router();


// setting up paths for each route
router.use('/api', apiRoutes);

router.use('/', homeRoutes);

router.use('/dashboard', dashboardRoutes);

//Error message
router.use((req, res) => {
    res.status(404).end();
    res.send("<h1>Wrong Route!</h1>")

});

module.exports = router;