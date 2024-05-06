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

async function getBank(request, response, next) {
  try {
    const bank = await banksService.getBank(request.params.id);

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
    const name = request.body.name;
    const email = request.body.email;
    const pin = request.body.pin;
    const pin_confirm = request.body.pin_confirm;

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
    const name = request.body.name;
    const email = request.body.email;

    const success = await banksService.updateBank(name, email);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update bank'
      );
    }

    return response.status(200).json(name);
  } catch (error) {
    return next(error);
  }
}

async function deleteBank(request, response, next) {
  try {
    const id = request.params.id;

    const success = await banksService.deleteBank(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete bank'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBanks,
  getBank,
  createBank,
  updateBank,
  deleteBank,
};
