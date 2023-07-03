module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.JSON,
      phone: DataTypes.STRING,
      website: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  return User;
};
