const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
//const banks = require('./components/banks/banks-route')

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  //banks(app);
  return app;
};
