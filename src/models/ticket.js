const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Ingresso = sequelize.define('Ingresso', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantidadeDisponivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'A quantidade disponível não pode ser negativa'
      }
    }
  }
});

module.exports = Ingresso;
