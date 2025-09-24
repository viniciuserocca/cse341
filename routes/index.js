const router = require('express').Router();

router.use('/',  
    //#swagger.tags=['Default']
    require('./swagger.js'));

router.get('/', 
    //#swagger.tags=['Default']
    (req, res) => {res.send('Hi there, use the /api-docs route')});

router.use('/books', 
    //#swagger.tags=['Books']
    require('./books.js'));

router.use('/reviews', 
    //#swagger.tags=['Reviews']
    require('./reviews.js'));

module.exports = router; 