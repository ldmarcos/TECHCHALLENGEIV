const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware(['Docentes']), usuarioController.listarUsuarios)
router.get('/:id', usuarioController.obterUsuario);
router.post('/signup', usuarioController.signup);
router.post('/login', usuarioController.login);
router.put('/:id', authMiddleware(['Docentes']), usuarioController.atualizarUsuario);
router.delete('/:id', authMiddleware(['Docentes']), usuarioController.deletarUsuario);

module.exports = router;
