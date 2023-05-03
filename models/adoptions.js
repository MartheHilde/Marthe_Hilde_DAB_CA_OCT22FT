module.exports = (sequelize, Sequelize) => {
    const Adoptions = sequelize.define('Adoptions', {
      adoptionDate: Sequelize.DataTypes.DATE
    }, {
      timestamps: false
    });
  
    Adoptions.associate = function (models) {
      Adoptions.belongsTo(models.Users),
      Adoptions.belongsTo(models.Animals)
    }
  
    return Adoptions
  }
  