const Usuario = require('./user');
const Ingresso = require('./ticket');
const Compra = require('./purchase');

Usuario.hasMany(Compra, {
  foreignKey: 'usuarioId',
  as: 'compras'
});
Compra.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario'
});

Ingresso.hasMany(Compra, {
  foreignKey: 'ingressoId',
  as: 'compras'
});
Compra.belongsTo(Ingresso, {
  foreignKey: 'ingressoId',
  as: 'ingresso'
});

module.exports = {
  Usuario,
  Ingresso,
  Compra,
  sequelize: require('../config/sequelize')
};