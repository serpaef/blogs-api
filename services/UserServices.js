const { User } = require('../models');

function sendError(status, message) {
  return { status, message };
}

function validateDisplayName(displayName) {
  const error = sendError(400, '"displayName" length must be at least 8 characters long');
  
  if (!displayName
    || typeof displayName !== 'string'
    || displayName.length < 8
  ) return error;

  return false;
}

function validateEmail(email) {
  const error = sendError(400, '"email" must be a valid email');
  
  const emailRegex = /\w{1,}@\w{1,}\.\w{1,}/;
  if (!emailRegex.test(email)) {
    return error;
  }

  return false;
}

function validatePassword(password) {
  const error = sendError(400, '"password" length must be 6 characters long');

  if (password.length !== 6) return error;

  return false;
}

async function verifyExistingEmail(email) {
  const error = sendError(409, 'User already registered');

  const user = await User.findOne({ where: { email } }) || false;
  if (user) return error;

  return false;
}

async function create(userData) {
  const user = await User.create(userData);
  return user;
}

async function getAll() {
  const users = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return users;
}

async function getById(id) {
  const user = await User.findByPk(id, { attributes: ['id', 'displayName', 'email', 'image'] });
  return user.dataValues;
}

module.exports = { 
  validateDisplayName,
  validateEmail,
  validatePassword,
  verifyExistingEmail,
  create,
  getAll,
  getById,
};
