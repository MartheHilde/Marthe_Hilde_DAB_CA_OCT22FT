const { Species, Temperament, Animals } = require('../../models');


/*
  ADOPTING ANIMALS
*/
async function adoptAnimal(id, req) {
  console.log("Adopting animal...")
  const currentUser = req.session.userId;
  const role = req.user.roles;

  try {
    if (role !== "member") {
      return { success: false, message: "Only members can adopt animals." };
    }

    // Check if the user has already adopted the animal:)
    const adoption = await Adoptions.findOne({
      where: {
        UserId: currentUser,
        AnimalId: id
      }
    });

    if (adoption) {
      // The user has already adopted the animal
      return { success: false, message: "You have already adopted this animal." };
    }

    // Create a new adoption record
    const newAdoption = await Adoptions.create({
      UserId: currentUser,
      AnimalId: id,
      adoptionDate: new Date()
    });

    // Mark the animal as adopted
    const animal = await Animals.findOne({ where: { id: id } });
    animal.Adopted = true;
    await animal.save();

    return { success: true, message: "Adoption successful!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error." };
  }
}



/*
  CANCEL ADOPTION
*/
async function cancelAdoption(id, req) {
  const currentUser = req.session.userId;
  const role = req.user.roles;

  try {
    if (role !== "admin") {
      return { success: false, message: "Only admins can cancel animal adoptions." };
    }

    // Find the adoption record to be cancelled
    const adoption = await Adoptions.findOne({
      where: { AnimalId: id },
      include: [{ model: Users, where: { id: currentUser } }]
    });

    if (!adoption) {
      return { success: false, message: "No adoption found for this animal and user." };
    }

    // Update the adoption record to set adoptionDate to null
    adoption.adoptionDate = null;
    await adoption.save();

    // Mark the animal as not adopted
    const animal = await Animals.findOne({ where: { id: id } });
    animal.Adopted = false;
    await animal.save();

    return { success: true, message: "Adoption cancelled successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error." };
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
  adoptAnimal,
  cancelAdoption,
  updateSpecies,
  addSpecies,
  deleteSpecies,
  updateTemperament,
  deleteTemperament,
  addTemperament
};