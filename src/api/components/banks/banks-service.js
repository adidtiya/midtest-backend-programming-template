const bankRepository = require('./bank-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get list of banks
 * @returns {Array}
 */
async function getBanks() {
  const banks = await bankRepository.getBanks();
  return banks;
}

/**
 * Get bank detail
 * @param {string} id - Bank ID
 * @returns {Object}
 */
async function getBank(id) {
  const bank = await bankRepository.getBank(id);

  // Bank not found
  if (!bank) {
    return null;
  }

  return {
    id: bank.id,
    name: bank.name,
    email: bank.email,
  };
}

/**
 * Create new bank
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} pin - Pin
 * @returns {boolean}
 */
async function createBank(name, email, pin) {
  // Hash pin
  const hashedPin = await hashPassword(pin);

  try {
    await bankRepository.createBank(name, email, hashedPin);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing bank
 * @param {string} id - Bank ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateBank(id, name, email) {
  const bank = await bankRepository.getBank(id);

  // Bank not found
  if (!bank) {
    return null;
  }

  try {
    await bankRepository.updateBank(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete bank
 * @param {string} id - Bank ID
 * @returns {boolean}
 */
async function deleteBank(id) {
  const bank = await bankRepository.getBank(id);

  // Bank not found
  if (!bank) {
    return null;
  }

  try {
    await bankRepository.deleteBank(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the email is registered
 * @param {string} email - Email
 * @returns {boolean}
 */
async function emailIsRegistered(email) {
  const bank = await bankRepository.getBankByEmail(email);

  if (bank) {
    return true;
  }

  return false;
}

/**
 * Check whether the pin is correct
 * @param {string} bankId - Bank ID
 * @param {string} pin - Pin
 * @returns {boolean}
 */
async function checkPin(bankId, pin) {
  const bank = await bankRepository.getBank(bankId);
  return passwordMatched(pin, bank.pin);
}

/**
 * Change bank pin
 * @param {string} bankId - Bank ID
 * @param {string} pin - Pin
 * @returns {boolean}
 */
async function changePin(bankId, pin) {
  const bank = await bankRepository.getBank(bankId);

  // Check if bank not found
  if (!bank) {
    return null;
  }

  const hashedPin = await hashPassword(pin);

  const changeSuccess = await bankRepository.changePin(
    bankId,
    hashedPin
  );

  if (!changeSuccess) {
    return null;
  }

  return true;
}

module.exports = {
  getBanks,
  getBank,
  createBank,
  updateBank,
  deleteBank,
  emailIsRegistered,
  checkPin,
  changePin,
};