module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('Users', {
        fullName: Sequelize.DataTypes.STRING,
        username: Sequelize.DataTypes.STRING,
        password: Sequelize.DataTypes.STRING,
        role: Sequelize.DataTypes.STRING
    },{
        timestamps: false
    });
    return User
}