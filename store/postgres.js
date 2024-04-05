const { Sequelize } = require('sequelize');

function ConnectPostgres(env) {
    var connectionString = `postgres://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`

    const sequelize = new Sequelize(connectionString)

    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }   
}

module.exports = ConnectPostgres;