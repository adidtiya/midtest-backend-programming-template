const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const bankControllers = require('./banking-controller');
const bankValidator = require('./banking-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/accounts', route);

  // list akun
  route.get('/', authenticationMiddleware, bankControllers.getAccounts);

  // membuat akun baru
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(bankValidator.createAccount),
    bankControllers.createAccount
  );

  // mencari detail akun
  route.get('/:id', authenticationMiddleware, bankControllers.getAccount);

  // mengupdate akun 
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(bankValidator.updateAccount),
    bankControllers.updateAccount
  );

  // menghapus akun 
  route.delete('/:id', authenticationMiddleware, bankControllers.deleteAccount);
};