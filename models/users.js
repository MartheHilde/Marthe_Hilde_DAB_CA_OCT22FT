module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('Users', {
      fullName: Sequelize.DataTypes.STRING,
      username: Sequelize.DataTypes.STRING,
      password: Sequelize.DataTypes.STRING,
      roles: Sequelize.DataTypes.STRING 
    });

    User.associate = function(models) {
    User.hasMany(models.Adoptions);
    }
    return User
}
