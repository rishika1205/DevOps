const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// This will create the table if it does not exist (and perform any necessary updates)
sequelize.sync()
  .then(() => {
    console.log('User table synced successfully.');
  })
  .catch((err) => {
    console.error('Error syncing User table:', err);
  });

module.exports = { User, sequelize };
