require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const { JWT_SECRET } = process.env;

const login = express.Router();

async function validateEmail(req, res, next) {
  try {
    const { email } = req.body;

    if (email === undefined) return res.status(400).json({ message: '"email" is required' });
    if (email === '') {
      return res.status(400).json({ message: '"email" is not allowed to be empty' });
    }

    const exists = await User.findOne({ where: { email } });
    if (!exists) return res.status(400).json({ message: 'Invalid fields' });

    req.user = exists.dataValues;

    next();
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ message: 'Server error, try again in a few minutes.' });
  }
}

function validatePassword(req, res, next) {
  try {
    const { password } = req.body;

    if (password === undefined) return res.status(400).json({ message: '"password" is required' });
    if (password === '') {
      return res.status(400).json({ message: '"password" is not allowed to be empty' });
    }

    const { user } = req;

    if (password !== user.password) return res.status(400).json({ message: 'Invalid fields' });

    next();
  } catch ({ message }) {
    console.log(message);
    return res.status(500).json({ message: 'Server error, try again in a few minutes.' });
  }
}

function doLogin(req, res) {
  const { user } = req;
  const payload = { email: user.email, id: user.id };

  const token = jwt.sign(payload, JWT_SECRET);

  return res.status(200).json({ token });
}

login.post('/',
  validateEmail,
  validatePassword,
  doLogin);

module.exports = login;
