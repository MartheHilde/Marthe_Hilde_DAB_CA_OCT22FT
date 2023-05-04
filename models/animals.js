
module.exports = (sequelize, Sequelize) => {
    const Animals = sequelize.define('Animals', {
        Name: Sequelize.DataTypes.STRING,
        Birthday: Sequelize.DataTypes.DATE,
        Adopted: Sequelize.DataTypes.BOOLEAN
    });

    Animals.associate = function(models) {
        Animals.belongsTo(models.Species),
        Animals.belongsTo(models.Size),
        Animals.belongsToMany(models.Temperament, {through: 'AnimalsTemperaments'}),
        Animals.hasMany(models.Adoptions)
    }

    return Animals
}
