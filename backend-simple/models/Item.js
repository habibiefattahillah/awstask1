const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('items', {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
        notEmpty: {
          msg: 'title cannot be empty',
        },
    },
  },
  description: {    
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        notEmpty: {
          msg: 'description cannot be empty',
        },
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Note;