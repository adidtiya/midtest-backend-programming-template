const banksService = require('./banks-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBanks(request, response, next) {
  try {
    const banks = await banksService.getBanks();

    return response.status(200).json(banks);
  } catch (error) {
    return next(error);
  }
}

async function getBanks(request, response, next) {
  try {
    const bankId = request.params.id;
    const bank = await banksService.getBanks(bankId);

    if (!bank) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown bank');
    }

    return response.status(200).json(bank);
  } catch (error) {
    return next(error);
  }
}

async function createBank(request, response, next) {
  try {
    const { name, email, pin } = request.body;

    const success = await banksService.createBank(name, email, pin);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create bank'
      );
    }

    return response.status(200).json({ name, email });
  } catch (error) {
    return next(error);
  }
}

async function updateBank(request, response, next) {
  try {
    const bankId = request.params.id;
    const { name, email } = request.body;

    const success = await banksService.updateBank(bankId, name, email);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update bank'
      );
    }

    return response.status(200).json({ name });
  } catch (error) {
    return next(error);
  }
}

async function deleteBank(request, response, next) {
  try {
    const bankId = request.params.id;

    const success = await banksService.deleteBank(bankId);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete bank'
      );
    }

    return response.status(200).json({ id: bankId });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBanks,
  createBank,
  updateBank,
  deleteBank,
};
