// backend/src/models/index.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração do banco de dados
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
});

// Importação dos modelos
const Usuario = require('./usuario.model');
const Tarefa = require('./tarefa.model');

// Definição das relações
Usuario.hasMany(Tarefa, { foreignKey: 'usuario_id' });

Tarefa.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Exportando conexão e modelos
module.exports = { sequelize, Usuario, Tarefa };