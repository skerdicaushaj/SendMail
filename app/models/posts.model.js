const User = require('./users.model.js');
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("posts", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },
          body: {
            type: DataTypes.STRING,
            allowNull: false
          }
    }, {
        timestamps: false,
        associate: function(models) {
          Posts.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
      }
    });

    return Posts;
};
