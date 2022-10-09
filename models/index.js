const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const db = {};

db.order = require("./maintenance.order")(sequelize, Sequelize);
db.service = require("./maintenance.service")(sequelize, Sequelize);

module.exports = db;