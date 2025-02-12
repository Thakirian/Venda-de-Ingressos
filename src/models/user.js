const { DataTypes } = require('sequelize');
const sequelize = require('../data'); // Arquivo que configura o Sequelize
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Email inválido'
      }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  administrador: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  hooks: {
    beforeCreate: async (usuario) => {
      const salt = await bcrypt.genSalt(10);
      usuario.senha = await bcrypt.hash(usuario.senha, salt);
    }
  }
});

module.exports = Usuario;
