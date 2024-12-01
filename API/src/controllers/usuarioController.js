const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

exports.listarUsuarios = async(req, res) =>{
  const grupo = req.query.grupo
  try {
    const usuarios = await Usuario.findAll({
      where: {
        grupo: grupo
      },
      order: [['nome', 'ASC']]
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ error: 'Falha ao listar os usuários' });
  }
}

exports.obterUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

     res.status(200).json(usuario)
  } catch (error) {
    res.status(400).json({ error: 'Falha ao obter o usuário' });
  }
};

exports.signup = async (req, res) => {
  const { nome, email, grupo, senha } = req.body;
  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({ nome, email, grupo, senha: hashedSenha });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Falha no cadastro do usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    const isSenhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!isSenhaValida) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    if (!usuario.grupo || !usuario.id) {
      return res.status(400).json({ error: 'Usuário ou grupo inválido' });
  }

    const token = jwt.sign(
        { id: usuario.id, grupo: usuario.grupo },
        process.env.JWT_SECRET,
        { expiresIn: '4h' }
    );

  res.json({ token, email, nome: usuario.nome});
  } catch (error) {
    res.status(400).json({ error: 'Falha no login' });
  }
};

exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const hashedSenha = await bcrypt.hash(senha, 10);
    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = hashedSenha
    await usuario.save();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Falha ao editar o usuário' });
  }
};

exports.deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrada' });
    }
    await usuario.destroy();
    res.json({ message: 'Usuário deletada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Falha ao deletar usuário' });
  }
};