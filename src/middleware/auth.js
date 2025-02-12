const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        erro: true,
        mensagem: 'Token não fornecido'
      });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decodificado = jwt.verify(token, process.env.JWT_SECRET);

      const usuario = await Usuario.findByPk(decodificado.id);

      if (!usuario) {
        return res.status(401).json({
          erro: true,
          mensagem: 'Usuário não encontrado'
        });
      }

      req.usuario = usuario;

      return next();
    } catch (err) {
      return res.status(401).json({
        erro: true,
        mensagem: 'Token inválido'
      });
    }
  } catch (err) {
    return res.status(500).json({
      erro: true,
      mensagem: 'Erro na autenticação'
    });
  }
};

module.exports = authMiddleware;
