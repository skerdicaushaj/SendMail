const process = require('process');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_SERVER,
  dialect: 'mysql',
  port: process.env.MYSQL_PORT,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.sync();
db.service = require("./posts.model.js")(sequelize, Sequelize);
db.user = require("./users.model.js")(sequelize, Sequelize);

module.exports = db;
