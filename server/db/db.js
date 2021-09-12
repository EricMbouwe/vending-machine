require('dotenv').config();

const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/vending_machine',
  {
    logging: false,
  },
);

module.exports = db; // Here is the implementation of the db and the type of db choosen (Psql, Mysql, etc...)
