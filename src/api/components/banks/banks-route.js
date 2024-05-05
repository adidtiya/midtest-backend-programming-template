const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const bankControllers = require('./banks-constoller');
const bankValidator = require('./banks-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/accounts', route);

  // list akun
  route.get('/', authenticationMiddleware, bankControllers.getBanks);

  // membuat akun baru
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(bankValidator.createBank),
    bankControllers.createBank
  );

  // mencari detail akun
  route.get('/:id', authenticationMiddleware, bankControllers.getBanks);

  // mengupdate akun
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(bankValidator.updateBank),
    bankControllers.updateBank
  );

  // menghapus akun
  route.delete('/:id', authenticationMiddleware, bankControllers.deleteBank);
};
