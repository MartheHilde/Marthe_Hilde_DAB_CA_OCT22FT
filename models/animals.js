

module.exports = (sequelize, Sequelize) => {
    const Animals = sequelize.define('Animals', {
        Name: Sequelize.DataTypes.STRING,
        Birthday: Sequelize.DataTypes.DATE,
        Size: Sequelize.DataTypes.STRING,
        Adopted: Sequelize.DataTypes.BOOLEAN
    },{
        timestamps: false
    });
    return Animals
}


