// backend/src/app.js

const express = require('express');
const cors = require('cors');
const tarefaRoutes = require('./src/routes/tarefa.routes');
const authRoutes = require('./src/routes/auth.routes');
const { sequelize } = require('./src/config/database');
const setupSwagger = require('./src/config/swagger');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// Configurar Swagger
setupSwagger(app);

// Rotas
app.use('/tarefas', tarefaRoutes);
app.use('/', authRoutes);

// Conectar ao banco de dados
dbConnect();

async function dbConnect() {
    try {
        await sequelize.authenticate();
        console.log('Conectado ao banco de dados!');
        await sequelize.sync(); // Garante que os modelos estão sincronizados com o banco
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error);
    }
}

const server = app.listen(PORT, () => {
    console.log(`Servidor rodando no porto ${PORT}`);
});

app.get('/test', (req, res) => {
    res.send("Servidor rodando corretamente!");
});

module.exports = { app, server };
