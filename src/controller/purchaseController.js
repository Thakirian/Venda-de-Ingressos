const { Compra, Ingresso, sequelize } = require('../models');

const PurchaseController = {
  async criar(req, res) {
    const t = await sequelize.transaction();

    try {
      const { ingressoId, quantidade } = req.body;
      const usuarioId = req.user.id; 

      const ingresso = await Ingresso.findByPk(ingressoId, { transaction: t });
      
      if (!ingresso) {
        await t.rollback();
        return res.status(404).json({ mensagem: 'Ingresso não encontrado' });
      }

      if (ingresso.quantidadeDisponivel < quantidade) {
        await t.rollback();
        return res.status(400).json({ mensagem: 'Quantidade indisponível' });
      }

      const precoTotal = ingresso.preco * quantidade;

      const compra = await Compra.create({
        usuarioId,
        ingressoId,
        quantidade,
        precoTotal
      }, { transaction: t });

      await ingresso.update({
        quantidadeDisponivel: ingresso.quantidadeDisponivel - quantidade
      }, { transaction: t });

      await t.commit();
      return res.status(201).json(compra);
    } catch (error) {
      await t.rollback();
      return res.status(400).json({ mensagem: error.message });
    }
  },

  async listarCompras(req, res) {
    try {
      const compras = await Compra.findAll({
        where: { usuarioId: req.user.id },
        include: [Ingresso]
      });
      return res.json(compras);
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }
  }
};

module.exports = PurchaseController;
