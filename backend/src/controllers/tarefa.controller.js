// backend/src/controllers/tarefa.controller.js

const { Tarefa } = require('../models');

/**
 * @swagger
 * /tarefas:
 *   get:
 *     summary: Retorna todas as tarefas do usuário logado
 *     tags: [Tarefas]
 *     description: Obtém a lista de todas as tarefas cadastradas no sistema associadas ao usuário autenticado.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: 7bc23b0f-890b-4f2a-a7b8-989b354dafdd
 *                   titulo:
 *                     type: string
 *                     example: "Finalizar relatório"
 *                   descricao:
 *                     type: string
 *                     example: "Relatório deve ser finalizado até sexta-feira."
 *                   status:
 *                     type: string
 *                     example: "pendente"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-15T00:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-15T00:00:00Z"
 *       401:
 *         description: Token inválido ou não fornecido.
 *       500:
 *         description: Erro interno no servidor.
 */
exports.getAll = async (req, res) => {
    try {
        const usuario_id = req.user.id;
        const tarefas = await Tarefa.findAll({
            where: { usuario_id } // Apenas as tarefas desse usuário
        });
        res.status(200).json(tarefas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar tarefas.' });
    }
};

/**
 * @swagger
 * /tarefas/{id}:
 *   get:
 *     summary: Retorna uma tarefa específica
 *     tags: [Tarefas]
 *     description: Busca uma tarefa pelo seu ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 7bc23b0f-890b-4f2a-a7b8-989b354dafdd
 *     responses:
 *       200:
 *         description: Tarefa encontrada e retornada com sucesso.
 *       404:
 *         description: Tarefa não encontrada.
 */
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const tarefa = await Tarefa.findByPk(id);
        if (!tarefa) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar a tarefa.' });
    }
};

/**
 * @swagger
 * /tarefas:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     description: Adiciona uma nova tarefa ao sistema.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Finalizar relatório"
 *               descricao:
 *                 type: string
 *                 example: "Relatório da sprint deve ser finalizado até sexta-feira."
 *               status:
 *                 type: string
 *                 example: "pendente"
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso.
 *       500:
 *         description: Erro ao criar a tarefa.
 */
exports.create = async (req, res) => {
    try {
        const { titulo, descricao, status } = req.body;
        const usuario_id = req.user.id;
    
        if (!titulo) {
          return res.status(400).json({ mensagem: "O título é obrigatório." });
        }

        const statusPermitidos = ["pendente", "em progresso", "concluída"];
        if (!statusPermitidos.includes(status)) {
        return res.status(400).json({ mensagem: "Status inválido. Valores permitidos: pendente, em progresso, concluída." });
        }
    
        const novaTarefa = await Tarefa.create({
          titulo,
          descricao,
          status,
          usuario_id
        });
    
        return res.status(201).json(novaTarefa);
      } catch (erro) {
        return res.status(500).json({ mensagem: "Erro ao criar tarefa.", erro });
      }
};

/**
 * @swagger
 * /tarefas/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tarefas]
 *     description: Modifica os dados de uma tarefa com base no ID informado.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 7bc23b0f-890b-4f2a-a7b8-989b354dafdd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Atualizar relatório"
 *               descricao:
 *                 type: string
 *                 example: "O relatório precisa ser revisado antes da entrega."
 *               status:
 *                 type: string
 *                 example: "concluída"
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso.
 *       404:
 *         description: Tarefa não encontrada.
 */
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, status } = req.body;
        const usuario_id = req.user.id;

        const tarefa = await Tarefa.findOne({ where: { id, usuario_id } });

        if (!tarefa) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }

        await tarefa.update(
            {
                titulo: titulo || tarefa.titulo,
                descricao: descricao || tarefa.descricao,
                status: status || tarefa.status,
            },
            {
                where: { id: tarefa.id },
                // Atualiza apenas os campos permitidos
                fields: ['titulo', 'descricao', 'status', 'updatedAt']
            }
        );
        res.status(200).json({
            id: tarefa.id,
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
            status: tarefa.status,
            createdAt: tarefa.createdAt,
            updatedAt: tarefa.updatedAt
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar a tarefa.' });
    }
    
};

/**
 * @swagger
 * /tarefas/{id}:
 *   delete:
 *     summary: Remove uma tarefa
 *     tags: [Tarefas]
 *     description: Deleta uma tarefa existente pelo ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 7bc23b0f-890b-4f2a-a7b8-989b354dafdd
 *     responses:
 *       204:
 *         description: Tarefa removida com sucesso.
 *       404:
 *         description: Tarefa não encontrada.
 */
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario_id = req.user.id;

        const tarefa = await Tarefa.findOne({ where: { id, usuario_id } });

        if (!tarefa) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }

        await tarefa.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a tarefa.' });
    }
};
