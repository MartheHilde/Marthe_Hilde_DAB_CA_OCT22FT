const { Species } = require('../../models');
const { Temperament } = require('../../models');


/*
  ADPOTING ANIMALS
*/
async function adoptAnimal(id){
}

/*
  DELETING ANIMALS
*/
async function deleteAnimal(id){
  try {
    const deletedRows = await Animal.destroy({
      where: { id: id }
    });
    if (deletedRows === 0) {
      throw new Error('Animal does not exist');
    }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete animal');
  }
}

/* 
  UPDATE SPECIES
*/
async function updateSpecies(id){
  try {
    const newSpecies = prompt("Enter update:")
    const response = await fetch(`/species/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Species: newSpecies
      })
    });
    if (response.status !== 200) {
      throw new Error('Failed to update species');
    }
    console.log("DEBUG: after await")
    window.location.reload(); // Reload the page after successful update
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update species');
  }
}

/*
  ADD SPECIES
*/
async function addSpecies(speciesName) {
  try {
    const newSpecies = await Species.create({
      Species: speciesName
    });
    return newSpecies;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to add new species');
  }
}

//Check if want to delete
  function confirmDelete(speciesId) {
    if (confirm("Are you sure you want to delete this species?")) {
      deleteSpecies(speciesId);
    }
  }

/*
  DELETE SPECIES
*/

  function deleteSpecies(speciesId) {
    fetch(`/species/${speciesId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

/*
  ADD TEMPERAMENT
*/
async function addTemperament(temperamentName) {
  try {
    const newTemperament = await Temperament.create({
      Temperament: temperamentName
    });
    return newTemperament;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to add new temperament');
  }
}


/*
  UPDATE TEMPERAMENT
*/
async function updateTemperament(id) {
  try {
    const newTemperamentName = prompt('Enter update:');
    const response = await fetch(`/temperament/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Temperament: newTemperamentName
      })
    });
    if (response.status !== 200) {
      throw new Error('Failed to update temperament');
    }
    console.log('DEBUG: after await');
    window.location.reload(); // Reload the page after successful update
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update temperament');
  }
}

// Check if want to delete temp
function confirmDeleteTemp(temperamentId) {
  if (confirm('Are you sure you want to delete this temperament?')) {
    deleteTemperament(temperamentId);
  }
}

/*
  DELETE TEMPERAMENT
*/
function deleteTemperament(temperamentId) {
  fetch(`/temperament/${temperamentId}`, {
    method: 'DELETE'
  })
    .then(() => {
      location.reload(); // Reload the page after successful delete
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


module.exports = {
  deleteAnimal,
  updateSpecies,
  addSpecies,
  deleteSpecies,
  updateTemperament,
  deleteTemperament,
  addTemperament
};