const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers(search, sort) {
  const users = await usersRepository.getUsers();
  //search filter
  let filterQuery = {};
  if (search) { 
    const [fieldName, searchKey] = search.split(':');
    filterQuery[fieldName] = { $regex: searchKey, $options: 'i' };
  }
  const filtereUsers = users.filter((user) => {
    for (const key in filterQuery) {
      if (
        user[key] &&
        !user[key].toLowerCase().includes(filterQuery[key].$regex.toLowerCase())
      ) {
        return false;
      }
    }
    return true;
  });
  //sort filter
  let sortQuery = {};
  if (sort) {
    const [fieldName, sortOrder] = sort.split(':');
    sortQuery[fieldName] = sortOrder === 'desc' ? -1 : 1;
  } else {
    sortQuery['email'] = 1;
  }

  const filteredUsers = users
    .filter((user) => {
      for (const key in filterQuery) {
        if (
          user[key] &&
          !user[key]
            .toLowerCase()
            .includes(filterQuery[key].$regex.toLowerCase())
        ) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      for (const key in sortQuery) {
        if (a[key] < b[key]) return sortQuery[key];
        if (a[key] > b[key]) return -sortQuery[key];
      }
      return 0;
    });

  return filteredUsers;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
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
  const user = await usersRepository.getUserByEmail(email);

  if (user) {
    return true;
  }

  return false;
}

/**
 * Check whether the password is correct
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(userId, password) {
  const user = await usersRepository.getUser(userId);
  return passwordMatched(password, user.password);
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(userId, password) {
  const user = await usersRepository.getUser(userId);

  // Check if user not found
  if (!user) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const changeSuccess = await usersRepository.changePassword(
    userId,
    hashedPassword
  );

  if (!changeSuccess) {
    return null;
  }

  return true;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailIsRegistered,
  checkPassword,
  changePassword,
};
