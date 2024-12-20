const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (allowedGroups) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        const parts = authHeader.split(' ');

        if (parts.length !== 2) {
            return res.status(401).json({ error: 'Token malformado' });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ error: 'Token malformado' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token inválido' });
            }

            if (!allowedGroups.includes(decoded.grupo)) {
                return res.status(403).json({ error: 'Acesso negado para este grupo' });
            }

            req.userId = decoded.id;
            req.userGroup = decoded.grupo;

            return next();
        });
    };
};
