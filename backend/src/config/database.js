// backend/src/config/database.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração do banco de dados PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
    }
);

if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ alter: true })
      .then(() => console.log("Banco de dados sincronizado!"))
      .catch(err => console.error("Erro ao sincronizar banco:", err));
}

sequelize.authenticate()
  .then(() => console.log("Banco de dados conectado!"))
  .catch((error) => console.error("Erro ao conectar ao banco:", error));

module.exports = { sequelize };