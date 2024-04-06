const { Sequelize } = require('sequelize');

var connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const sequelize = new Sequelize(connectionString)

const db = sequelize

module.exports = db;