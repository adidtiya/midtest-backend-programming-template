const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

const failedLoginAttempts = {};
const FAILED_LOGIN_LIMIT = 5;
const LOGIN_TIMEOUT = 30 * 60 * 1000;

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;
  const currentTime = new Date().toISOString();
  try {
    if (
      failedLoginAttempts[email] &&
      failedLoginAttempts[email].attempts >= FAILED_LOGIN_LIMIT
    ) {
      const elapsedTime = Date.now() - failedLoginAttempts[email].lastAttempt;
      if (elapsedTime < LOGIN_TIMEOUT) {
        const remainingTime = Math.ceil(
          (LOGIN_TIMEOUT - elapsedTime) / 1000 / 60
        );
        console.log(
          `o [${currentTime}] User ${email} mencoba login, namun mendapat error 403 karena telah melebihi limit attempt.`
        );
        throw errorResponder(
          errorTypes.FORBIDDEN,
          `Too many failed login attempts. Please try again after ${remainingTime} minutes.`
        );
      } else {
        delete failedLoginAttempts[email];
      }
    }

    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      if (!failedLoginAttempts[email]) {
        failedLoginAttempts[email] = { attempts: 1, lastAttempt: Date.now() };
      } else {
        failedLoginAttempts[email].attempts++;
        failedLoginAttempts[email].lastAttempt = Date.now();
      }

      console.log(
        `o [${currentTime}] User ${email} gagal login pada ${new Date().toLocaleString()}. Attempt = ${failedLoginAttempts[email].attempts}.`
      );
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        `Login failed. Attempt: ${failedLoginAttempts[email].attempts}, Time: ${new Date().toLocaleString()}`
      );
    }

    delete failedLoginAttempts[email];

    console.log(`o [${currentTime}] User ${email} berhasil login.`);

    return response.status(200).json(loginSuccess);
  } catch (error) {
    console.log(
      `o [${currentTime}] User ${email} mencoba login pada ${new Date().toLocaleString()}, namun mendapat error ${error.code} karena ${error.message}`
    );
    return next(error);
  }
}

module.exports = {
  login,
};
