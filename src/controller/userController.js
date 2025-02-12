const { Usuario } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserController = {
  async registrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'Email já cadastrado' });
      }

      const usuario = await Usuario.create({ nome, email, senha });
      
      const token = jwt.sign(
        { id: usuario.id, administrador: usuario.administrador },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.status(201).json({ usuario, token });
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(400).json({ mensagem: 'Email ou senha inválidos' });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(400).json({ mensagem: 'Email ou senha inválidos' });
      }

      const token = jwt.sign(
        { id: usuario.id, administrador: usuario.administrador },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.json({ usuario, token });
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }
  }
};

module.exports = UserController;