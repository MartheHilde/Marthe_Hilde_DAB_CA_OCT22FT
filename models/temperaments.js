module.exports = (sequelize, Sequelize) => {
    const Temperament = sequelize.define('Temperament', {
        Temperament: Sequelize.DataTypes.STRING(45)
    },{
        timestamps: false
    });
    return Temperament
}
