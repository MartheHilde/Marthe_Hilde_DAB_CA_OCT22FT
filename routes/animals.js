var express = require('express');
var router = express.Router();
const { Animals, Species, Size, Temperament } = require('../models');

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

// router.get('/', async function (req, res, next) {
//   // const animals = await animalService.getAll();
//   let animals =  [
//     {
//       "Id": 1,
//       "Name": "Coco",
//       "Species": "Dwarf Hamster",
//       "Birthday": "2020-02-12",
//       "Temperament": "calm, scared",
//       "Size": "small",
//       "Adopted": false
//     },
//     {
//       "Id": 2,
//       "Name": "Ted",
//       "Species": "Tedy bear hamster",
//       "Birthday": "2021-02-12",
//       "Temperament": "calm, scared",
//       "Size": "small",
//       "Adopted": false
//     },
//     {
//       "Id": 3,
//       "Name": "Coco",
//       "Species": "Jack-Russel",
//       "Birthday": "2020-02-12",
//       "Temperament": "energetic",
//       "Size": "medium",
//       "Adopted": false
//     },
//     {
//       "Id": 4,
//       "Name": "Everrest",
//       "Species": "Budgy",
//       "Birthday": "2019-02-12",
//       "Temperament": "calm, happy",
//       "Size": "small",
//       "Adopted": false
//     },
//     {
//       "Id": 5,
//       "Name": "Rocko",
//       "Species": "Tortouse",
//       "Birthday": "2020-02-12",
//       "Temperament": "calm, lazy",
//       "Size": "medium",
//       "Adopted": false
//     },
//     {
//       "Id": 6,
//       "Name": "Goldy",
//       "Species": "Gold Fish",
//       "Birthday": "2023-02-12",
//       "Temperament": "calm",
//       "Size": "small",
//       "Adopted": false
//     },
//     {
//       "Id": 7,
//       "Name": "Lizzy",
//       "Species": "Lizzard",
//       "Birthday": "2020-02-12",
//       "Temperament": "calm,lazy",
//       "Size": "medium",
//       "Adopted": false
//     },
//     {
//       "Id": 8,
//       "Name": "Goga",
//       "Species": "Bearder Dragon",
//       "Birthday": "2018-02-12",
//       "Temperament": "calm, lazy, scared",
//       "Size": "large",
//       "Adopted": true
//     },
//     {
//       "Id": 9,
//       "Name": "Tweet Tweet",
//       "Species": "Parrot",
//       "Birthday": "2020-02-12",
//       "Temperament": "calm, happy",
//       "Size": "large",
//       "Adopted": false
//     },
//     {
//       "Id": 10,
//       "Name": "Toothless",
//       "Species": "Corn snake ",
//       "Birthday": "2017-02-12",
//       "Temperament": "scared",
//       "Size": "medium",
//       "Adopted": false
//     },
//     {
//       "Id": 11,
//       "Name": "Sophie",
//       "Species": "Dwarf Hamster",
//       "Birthday": "2020-02-12",
//       "Temperament": "calm, scared",
//       "Size": "small",
//       "Adopted": false
//     },
//     {
//       "Id": 12,
//       "Name": "Teddy",
//       "Species": "Teddy bear hamster",
//       "Birthday": "2021-02-12",
//       "Temperament": "calm, scared",
//       "Size": "small",
//       "Adopted": false
//     },
//     {
//       "Id": 13,
//       "Name": "Roger",
//       "Species": "Parrot",
//       "Birthday": "2020-02-18",
//       "Temperament": "calm, happy",
//       "Size": "large",
//       "Adopted": false
//     }
//    ]

//   res.render('animals', { user: null, animals: animals });
// });

module.exports = router;

