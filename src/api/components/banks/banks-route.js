const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const bankingControllers = require('./banking-controller');
const bankingValidator = require('./banking-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/accounts', route);

  // Get list of accounts
  route.get('/', authenticationMiddleware, bankingControllers.getAccounts);

  // Create account
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(bankingValidator.createAccount),
    bankingControllers.createAccount
  );

  // Get account detail
  route.get('/:id', authenticationMiddleware, bankingControllers.getAccount);

  // Update account
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(bankingValidator.updateAccount),
    bankingControllers.updateAccount
  );

  // Delete account
  route.delete('/:id', authenticationMiddleware, bankingControllers.deleteAccount);
};