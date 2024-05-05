const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const bankingControllers = require('./banking-controller');
const bankingValidator = require('./banking-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/accounts', route);

  // list akun
  route.get('/', authenticationMiddleware, bankingControllers.getAccounts);

  // membuat akun baru
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(bankingValidator.createAccount),
    bankingControllers.createAccount
  );

  // mencari detail akun
  route.get('/:id', authenticationMiddleware, bankingControllers.getAccount);

  // mengupdate akun 
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(bankingValidator.updateAccount),
    bankingControllers.updateAccount
  );

  // menghapus akun 
  route.delete('/:id', authenticationMiddleware, bankingControllers.deleteAccount);
};