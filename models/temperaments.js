module.exports = (sequelize, Sequelize) => {
    const Temperament = sequelize.define('Temperament', {
        Temperament: Sequelize.DataTypes.STRING
    });
    Temperament.associate = function (models) {
        Temperament.belongsToMany(models.Animals, {
            through: 'AnimalsTemperaments',
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        })
    }
    return Temperament
}