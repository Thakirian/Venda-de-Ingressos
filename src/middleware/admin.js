const adminMiddleware = (req, res, next) => {
    try {
      if (!req.usuario) {
        return res.status(401).json({
          erro: true,
          mensagem: 'Usuário não autenticado'
        });
      }
  
      if (!req.usuario.administrador) {
        return res.status(403).json({
          erro: true,
          mensagem: 'Acesso negado. Necessário privilégios de administrador'
        });
      }
  
      next();
    } catch (err) {
      return res.status(500).json({
        erro: true,
        mensagem: 'Erro na verificação de permissões'
      });
    }
  };
  
  module.exports = adminMiddleware;
  