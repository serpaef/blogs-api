require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const UserServices = require('../services/UserServices');

const user = express.Router();

function validateDisplayName(req, res, next) {
  const { displayName } = req.body;
  const validation = UserServices.validateDisplayName(displayName);
  if (validation) {
    return res.status(validation.status).json({ message: validation.message });
  }
  next();
}

function validateEmail(req, res, next) {
  const { email } = req.body;
  
  if (!email) return res.status(400).json({ message: '"email" is required' });

  const validation = UserServices.validateEmail(email);
  if (validation) {
    return res.status(validation.status).json({ message: validation.message });
  }

  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: '"password" is required' });

  const validation = UserServices.validatePassword(password);
  if (validation) {
    return res.status(validation.status).json({ message: validation.message });
  }

  next();
}

async function verifyExistingEmail(req, res, next) {
  const { email } = req.body;

  const validation = await UserServices.verifyExistingEmail(email);
  if (validation) {
    return res.status(validation.status).json({ message: validation.message });
  }

  next();
}

user.post('/',
  validateDisplayName,
  validateEmail,
  validatePassword,
  verifyExistingEmail,
  create);

module.exports = user;
