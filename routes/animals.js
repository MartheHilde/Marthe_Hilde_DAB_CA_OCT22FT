var express = require('express');
var router = express.Router();
const { Animals, Species, Size, Temperament, Adoptions, Users } = require("../models");
const { adoptAnimal, cancelAdoption } = require('../public/js/common');
const db = require('../models');



router.get('/', async function (req, res, next) {
  try {
    const animals = await Animals.findAll({
      include: [
        {
          model: Species,
          attributes: ['Species'],
        },
        {
          model: Size,
          attributes: ['Size'],
        },
        {
          model: Temperament,
          attributes: ['Temperament'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.render('animals', { user: req.user, animals: animals });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

// ADOPT AN ANIMAL
router.post('/adopt/:id', async (req, res) => {
  try {
    const animalId = req.params.id;
    const userId = req.user.id; 
    const animal = await Animals.findByPk(animalId);
    if (animal.Adopted) {
      return res.status(400).send({ error: 'Animal already adopted.' });
    }
    
    const adoption = await Adoptions.create({ adoptionDate: new Date() });
    await adoption.setUser(userId);
    await adoption.setAnimal(animalId);
    
    animal.Adopted = true;
    await animal.save();
    
    res.status(201).send({ message: 'Animal adopted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error adopting animal.' });
  }
});

module.exports = router;


// CANCEL ADOPTION
router.post('/cancelAdoption/:id', async (req, res) => {
  const animalId = req.params.id;

  try {
    const adoption = await Adoptions.findOne({
      where: { AnimalId: animalId }
    });

    if (!adoption) {
      return res.status(404).json({ message: 'Adoption not found' });
    }

    await Adoptions.destroy({
      where: { AnimalId: animalId }
    });

    await Animals.update(
      { Adopted: false },
      { where: { id: animalId } }
    );

    return res.status(200).json({ message: 'Adoption cancelled successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

