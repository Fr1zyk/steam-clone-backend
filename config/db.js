
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,     //.env: steam_clone
    process.env.DB_USER,     // postgres
    process.env.DB_PASS,     // 12344321m
    {
        host:     process.env.DB_HOST,   // postgres
        port:     process.env.DB_PORT,   // 5432
        dialect:  'postgres',
        logging:  false
    }
);

module.exports = sequelize;
