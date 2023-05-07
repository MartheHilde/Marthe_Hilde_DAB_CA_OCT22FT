
module.exports = (sequelize, Sequelize) => {
    const Size = sequelize.define('Size', {
        Size: Sequelize.DataTypes.STRING
    });

    return Size;
}
