const express = require('express');
const router = express.Router();
const postagemController = require('../controllers/postagemController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', postagemController.listarPostagens);
router.get('/search', postagemController.pesquisarPostagem);
router.get('/:id', postagemController.obterPostagem);
router.post('/', authMiddleware(['Docentes']), postagemController.criarPostagem);
router.put('/:id', authMiddleware(['Docentes']), postagemController.atualizarPostagem);
router.delete('/:id', authMiddleware(['Docentes']), postagemController.deletarPostagem);

module.exports = router;
