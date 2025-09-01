const { Sequelize } = require('sequelize');
const {
    DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, NODE_ENV
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: NODE_ENV === 'development' ? console.log : false
});

module.exports = sequelize;
