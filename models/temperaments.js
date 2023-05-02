//many to one, many animals can have the temperament..
module.exports = (sequelize, Sequelize) => {
    const Temperaments = sequelize.define('Temperament', {
        Temperament: Sequelize.DataTypes.STRING
    },{
        timestamps: false
    });
    return Temperaments
}