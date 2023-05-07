var express = require('express');
var router = express.Router();
const { Species } = require('../models');
const { addSpecies, updateSpecies, deleteSpecies } = require('../public/js/common');

router.get('/', async function (req, res, next) {
  try {
    const species = await Species.findAll();
    res.render('species', { user: req.user, species: species });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

router.put('/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const newSpecies = req.body;
    const result = await Species.update(newSpecies, {
      where: { id }
    });
    if (result[0] !== 1) {
      throw new Error('Failed to update species');
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});


router.post('/add', async function (req, res, next) {
  console.log("Connecting post request")
  try {
    const Species = req.body.Species;
    console.log("Getting species name");
    await addSpecies(Species);
    res.redirect('/species');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

// DELETE a species
router.delete('/:id', (req, res) => {
  const speciesId = req.params.id;

  Species.destroy({
    where: { id: speciesId }
  })
  .then(num => {
    if (num == 1) {
      res.send({ message: "Species was deleted successfully!" });
    } else {
      res.send({ message: `Cannot delete species with id=${speciesId}. Maybe the species was not found!` });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete species with id=" + speciesId
    });
  });
});


module.exports = router;
