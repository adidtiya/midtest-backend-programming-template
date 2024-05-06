const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const banksSchema = require('./banks-schema');
const transaksiSchema = require('./transaksi-schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const User = mongoose.model('users', mongoose.Schema(usersSchema));
const banks = mongoose.model('banks', mongoose.Schema(banksSchema));
const transaksi = mongoose.model('transaksi', mongoose.Schema(transaksiSchema));

module.exports = {
  mongoose,
  User,
  banks,
  transaksi,
};
