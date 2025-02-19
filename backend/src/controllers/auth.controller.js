// backend/src/controllers/auth.controller.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
require('dotenv').config();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Usuários]
 *     description: Cria uma conta de usuário com nome, email e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Usuario 00
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 example: Senha!123
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 nome:
 *                   type: string
 *                   example: "Usuario 00"
 *                 email:
 *                   type: string
 *                   example: "usuario@email.com"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-15T00:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-15T00:00:00Z"
 *       400:
 *         description: Email já cadastrado
 *       500:
 *         description: Erro ao registrar o usuário

 */
exports.register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        // Verificar se o email já existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });

        if (usuarioExistente) {
            return res.status(400).json({ error: 'Email já cadastrado.' });
        }

        // Criar hash da senha
        const senhaHash = await bcrypt.hash(senha, 10);
        const novoUsuario = await Usuario.create({ nome, email, senha: senhaHash });

        res.status(201).json({
            id: novoUsuario.id,
            nome: novoUsuario.nome,
            email: novoUsuario.email,
            createdAt: novoUsuario.createdAt,
            updatedAt: novoUsuario.updatedAt 
        });
    } catch (error) {
        console.error(" Erro ao registrar usuário: ", error);
        res.status(500).json({ error: "Erro ao registrar o usuário.", detalhes: error.message });
    }
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Usuários]
 *     description: Verifica as credenciais do usuário e retorna um token para autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 example: Senha!123
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna um token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI..."
 *       400:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro no servidor ao tentar realizar login
 */
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verificar se o usuário existe
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({ error: 'Credenciais inválidas.' });
        }

        // Verificar senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(400).json({ error: 'Credenciais inválidas.' });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar login.' });
    }
};
