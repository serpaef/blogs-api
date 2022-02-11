require('dotenv').config();

const express = require('express');

const Auth = require('./Auth');

const category = express.Router();

const CategoryServices = require('../services/CategoryServices');

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
}

async function create(req, res) {
  try {
    const { name } = req.body;
    const categoryCreated = await CategoryServices.create(name);

    return res.status(201).json(categoryCreated);
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ message: 'Server error, try again in a few minutes.' });
  }
}

async function getAll(_req, res) {
  try {
    const categories = await CategoryServices.getAll();

    return res.status(200).json(categories);
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ message: 'Server error, try again in a few minutes.' });
  }
}

category.post('/',
  Auth,
  validateName,
  create)
.get('/',
  Auth,
  getAll);

module.exports = category;
