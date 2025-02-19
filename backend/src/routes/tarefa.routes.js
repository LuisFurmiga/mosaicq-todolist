// backend/src/routes/tarefa.routes.js

const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefa.controller');
const authMiddleware = require("../middleware/auth");


router.get("/", authMiddleware, tarefaController.getAll);

router.get('/:id', authMiddleware, tarefaController.getById);

router.post('/', authMiddleware, tarefaController.create);

router.put('/:id', authMiddleware, tarefaController.update);

router.delete('/:id', authMiddleware, tarefaController.remove);

module.exports = router;