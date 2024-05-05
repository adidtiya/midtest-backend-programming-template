const { hashPassword } = require('../utils/password');
const Bank = require('../models/bank');
const logger = require('../utils/logger');

(async () => {
  try {
    const name = 'Default Bank';
    const email = 'default@bank.com';
    const password = 'DefaultPassword123!';

    const numBanks = await Bank.count({
      where: {
        name,
        email,
      },
    });

    if (numBanks > 0) {
      throw new Error(`Bank ${email} already exists`);
    }

    const hashedPassword = await hashPassword(password);
    await Bank.create({
      name,
      email,
      pin: hashedPassword,
    });
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();
