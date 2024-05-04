const Account = require('../models/Account');

/**
 * Get a list of accounts
 * @returns {Promise}
 */
async function getAccounts() {
  return Account.find({});
}

/**
 * Create a new account
 * @param {Object} accountData - Data for the new account
 * @returns {Promise}
 */
async function createAccount(accountData) {
  const account = new Account(accountData);
  return account.save();
}

/**
 * Get an account by ID
 * @param {string} id - Account ID
 * @returns {Promise}
 */
async function getAccountById(id) {
  return Account.findById(id);
}

/**
 * Update an account
 * @param {string} id - Account ID
 * @param {Object} accountData - New data for the account
 * @returns {Promise}
 */
async function updateAccount(id, accountData) {
  return Account.findByIdAndUpdate(id, { $set: accountData }, { new: true });
}

/**
 * Delete an account
 * @param {string} id - Account ID
 * @returns {Promise}
 */
async function deleteAccount(id) {
  return Account.deleteOne({ _id: id });
}

module.exports = {
  getAccounts,
  createAccount,
  getAccountById,
  updateAccount,
  deleteAccount,
};