require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const user = express.Router();

function validateDisplayName(req, res, next) {
  const { displayName } = req.body;
  const validation = UserServices.validateDisplayName(displayName);
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
  create
  );

module.exports = user;
