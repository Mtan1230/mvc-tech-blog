const router = require('express').Router();
const sequelize = require('../config/connection');



router.get('/', async (req, res) => {
    res.render('homepage');
});

module.exports = router;