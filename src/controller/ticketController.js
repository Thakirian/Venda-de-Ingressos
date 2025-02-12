const { Ingresso } = require('../models/ticket');

const TicketController= {
  async criar(req, res) {
    try {
      const { nome, preco, quantidadeDisponivel } = req.body;
      const ingresso = await Ingresso.create({ nome, preco, quantidadeDisponivel });
      return res.status(201).json(ingresso);
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }
  },

  async listar(req, res) {
    try {
      const ingressos = await Ingresso.findAll();
      return res.json(ingressos);
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }
  },

  async buscar(req, res) {
    try {
      const ingresso = await Ingresso.findByPk(req.params.id);
      if (!ingresso) {
        return res.status(404).json({ mensagem: 'Ingresso não encontrado' });
      }
      return res.json(ingresso);
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { nome, preco, quantidadeDisponivel } = req.body;
      const ingresso = await Ingresso.findByPk(req.params.id);
      
      if (!ingresso) {
        return res.status(404).json({ mensagem: 'Ingresso não encontrado' });
      }

      await ingresso.update({ nome, preco, quantidadeDisponivel });
      return res.json(ingresso);
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }
  },

  async excluir(req, res) {
    try {
      const ingresso = await Ingresso.findByPk(req.params.id);
      
      if (!ingresso) {
        return res.status(404).json({ mensagem: 'Ingresso não encontrado' });
      }

      await ingresso.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }
  }
};

module.exports = TicketController;
