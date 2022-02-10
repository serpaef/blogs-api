require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const UserServices = require('../services/UserServices');

const { JWT_SECRET } = process.env;

const login = express.Router();

const invalidFields = { message: 'Invalid Fields' };

async function validateEmail(req, res, next) {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json(invalidFields);

    const exists = await UserServices.verifyExistingEmail(email);
    if (!exists) return res.status(400).json(invalidFields);

    next();
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ message: 'Server error, try again in a few minutes.' });
  }
}

login.post('/',
  validateEmail,
  validatePassword,
  doLogin);

module.exports = login;
