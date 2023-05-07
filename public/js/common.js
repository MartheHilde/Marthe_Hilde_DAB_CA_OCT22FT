const { Species, Temperament, Animals } = require('../../models');

/*
  ADOPTING ANIMALS
*/
function adoptAnimal(animalId) {
  fetch(`/animals/adopt/${animalId}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      window.location.reload();
    })
    .catch(error => {
      console.error(error);
      console.log("Could not adopt this animal")
    });
}


/*
  CANCEL ADOPTION
*/
function cancelAdoption(animalId) {
  fetch(`/animals/cancelAdoption/${animalId}`, {
    method: 'POST'
  })
  .then(response => {
    if (response.status === 200) {
      alert('Adoption cancelled successfully');
      window.location.reload();
    } else {
      alert('Failed to cancel adoption');
    }
  })
  .catch(error => {
    console.log(error);
    alert('An error occurred');
  });
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
    window.location.reload(); 
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
    window.location.reload(); 
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
      location.reload(); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


module.exports = {
  adoptAnimal,
  cancelAdoption,
  updateSpecies,
  addSpecies,
  deleteSpecies,
  updateTemperament,
  deleteTemperament,
  addTemperament
};