module.exports = (sequelize, Sequelize) => {
    const Temperament = sequelize.define('Temperament', {
        Temperament: Sequelize.DataTypes.STRING
    });
    return Temperament
}
