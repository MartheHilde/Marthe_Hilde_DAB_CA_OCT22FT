var express = require('express');
var router = express.Router();
const { Temperament } = require('../models');
const { addTemperament, updateTemperament, deleteTemperament } = require('../public/js/common');



router.get('/', async function (req, res, next) {
    try {
      const temperaments = await Temperament.findAll();
      res.render('temperaments', { user: req.user, temperaments: temperaments });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });

router.put('/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const newTemperament = req.body.Temperaments; 
    const result = await Temperament.update({ Temperament: newTemperament }, {
      where: { id }
    });
    if (result[0] !== 1) {
      throw new Error('Failed to update temperament');
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/add', async function (req, res) {
  console.log("Connecting post request");
  try {
    const temperament = req.body.Temperaments; //
    console.log("Getting temperament name");
    await addTemperament(temperament);
    res.redirect('/temperaments');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

// DELETE a temperament
router.delete('/:id', async (req, res) => {
  const temperamentId = req.params.id;

  try {
    const num = await Temperament.destroy({
      where: { id: temperamentId }
    });
    if (num == 1) {
      res.send({ message: "The temperament was deleted successfully!" });
    } else {
      res.send({ message: `Cannot delete temperament with id=${temperamentId}. Maybe the temperament was not found!` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Could not delete temperament with id=" + temperamentId
    });
  }
});

module.exports = router;
