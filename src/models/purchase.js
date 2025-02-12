const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Compra = sequelize.define('Compra', {
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1],
        msg: 'A quantidade deve ser pelo menos 1'
      }
    }
  },
  precoTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = Compra;
