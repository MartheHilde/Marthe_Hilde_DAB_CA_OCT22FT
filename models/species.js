module.exports = (sequelize, Sequelize) => {
    const Species = sequelize.define('Species', {
        species: Sequelize.DataTypes.STRING
    },{
        timestamps: false
    });

    return Species;
}
