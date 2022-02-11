require('dotenv').config();

const express = require('express');

const Auth = require('./Auth');

const blogpost = express.Router();

const CategoryServices = require('../services/CategoryServices');
const BlogPostServices = require('../services/BlogpostServices');

function verifyTitle(req, res, next) {
  const { title } = req.body;
  if (!title) return res.status(401).json({ message: '"title" is required' });
  next();
}

function verifyContent(req, res, next) {
  const { content } = req.body;
  if (!content) return res.status(401).json({ message: '"content" is required' });
  next();
}

async function verifyCategories(req, res, next) {
  try {
    const { categoryIds } = req.body;

    if (!categoryIds || categoryIds.length < 1) {
      return res.status(400).json({ message: '"categoryIds" is required' });
    }

    const categories = await CategoryServices.findAll({ where: { id: categoryIds } });
    if (categories.length !== categoryIds.length) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }

    next();
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ message: 'Server error, try again in a few minutes' });
  }
}

blogpost.post('/',
  Auth,
  verifyTitle,
  verifyContent,
  verifyCategories);

module.exports = blogpost;
