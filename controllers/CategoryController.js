require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const Auth = require('./Auth');

const { JWT_SECRET } = process.env;

const category = express.Router();

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
}

category.post('/',
  validateName
  Auth)

module.exports = category;
