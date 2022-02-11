require('dotenv').config();

const express = require('express');

const Auth = require('./Auth');

const category = express.Router();

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
}

category.post('/',
  Auth,
  validateName);

module.exports = category;
