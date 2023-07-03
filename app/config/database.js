const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    host: process.env.MYSQL_SERVER,
    username: process.env.MYSQL_USER ,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql'
});

module.exports = sequelize;