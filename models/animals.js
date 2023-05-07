
module.exports = (sequelize, Sequelize) => {
    const Animals = sequelize.define('Animals', {
        Name: Sequelize.DataTypes.STRING,
        Birthday: Sequelize.DataTypes.DATE,
        Adopted: Sequelize.DataTypes.BOOLEAN
    });

    Animals.associate = function(models) {
        Animals.belongsTo(models.Species, {
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        }),
        Animals.belongsTo(models.Size),
        Animals.belongsToMany(models.Temperament, {
            through: 'AnimalsTemperaments',
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        }),
        Animals.hasMany(models.Adoptions)
    }
    return Animals
}
