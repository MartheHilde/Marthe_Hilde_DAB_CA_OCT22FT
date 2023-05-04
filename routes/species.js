var express = require('express');
var router = express.Router();
const { Species } = require('../models');


router.get('/', async function (req, res, next) {
    try {
      const species = await Species.findAll();
      res.render('species', { user: req.user, species: species });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });

router.post('/update', async function (req,res,next){
    res.render("index",{user: null})
})

module.exports = router;