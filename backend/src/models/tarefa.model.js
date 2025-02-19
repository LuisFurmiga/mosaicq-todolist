// backend/src/models/tarefa.model.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Tarefa = sequelize.define('Tarefa', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pendente",
        validate: {
          isIn: [["pendente", "em progresso", "concluída"]], // Isso impede valores inválidos
        },
        field: "status",
    },      
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    },
    usuario_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
}, {
    tableName: 'tarefas',
    timestamps: false,
});

module.exports = Tarefa;