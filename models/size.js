//many to one, many animals can have the temperament..
module.exports = (sequelize, Sequelize) => {
    const Size = sequelize.define('Size', {
        Size: Sequelize.DataTypes.STRING
    },{
        timestamps: false
    });

    return Size;
}
