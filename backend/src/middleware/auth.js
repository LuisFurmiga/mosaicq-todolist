// backend/src/middleware/auth.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Define 'req.user' com os dados do usuário logado
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido." });
    }
};
