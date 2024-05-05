const bankRepository = require('./banks-repository');
const { hashPassword } = require('../../../utils/password');

async function getBanks() {
  return await bankRepository.getBanks();
}

async function getBank(id) {
  return await bankRepository.getBank(id);
}

async function createBank(name, email, pin) {
  const hashedPin = await hashPassword(pin);
  try {
    await bankRepository.createBank(name, email, hashedPin);
    return true;
  } catch (err) {
    return false;
  }
}

async function updateBank(name, email) {
  try {
    const bank = await bankRepository.getBankByEmail(email);
    if (!bank) {
      return false;
    }
    await bankRepository.updateBank(name, email);
    return true;
  } catch (err) {
    return false;
  }
}

async function deleteBank(id) {
  try {
    const bank = await bankRepository.getBank(id);
    if (!bank) {
      return false;
    }
    await bankRepository.deleteBank(id);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  getBanks,
  getBank,
  createBank,
  updateBank,
  deleteBank,
};