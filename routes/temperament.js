var express = require('express');
var router = express.Router();
const { Temperament } = require('../models');


router.get('/', async function (req, res, next) {
    try {
      const temperaments = await Temperament.findAll();
      res.render('temperaments', { user: req.user, temperaments: temperaments });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });

router.post('/update', async function (req,res,next){
    res.render("index",{user: req.user})
})

module.exports = router;