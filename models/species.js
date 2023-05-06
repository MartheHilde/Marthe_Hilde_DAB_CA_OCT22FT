module.exports = (sequelize, Sequelize) => {
    const Species = sequelize.define('Species', {
        Species: Sequelize.DataTypes.STRING
    });
    return Species;
}