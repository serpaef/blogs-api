require('dotenv').config();

const express = require('express');

const Auth = require('./Auth');

const blogpost = express.Router();

const BlogPostServices = require('../services/BlogpostServices');
const { Category } = require('../models');

function verifyTitle(req, res, next) {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  next();
}

function verifyContent(req, res, next) {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: '"content" is required' });
  next();
}

async function verifyCategories(req, res, next) {
  try {
    const { categoryIds } = req.body;

    if (!categoryIds || categoryIds.length < 1) {
      return res.status(400).json({ message: '"categoryIds" is required' });
    }

    const categories = await Category.findAll({ where: { id: categoryIds } });
    if (categories.length !== categoryIds.length) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }

    next();
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ message: 'Server error, try again in a few minutes' });
  }
}

async function create(req, res) {
  try {
    const { title, content } = req.body;
    const { id } = req.user;
    const payload = { userId: id, title, content };

    const newPost = await BlogPostServices.create(payload);
    return res.status(201).json(newPost);
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ message: 'Server error, try again in a few minutes' });
  }
}

blogpost.post('/',
  Auth,
  verifyTitle,
  verifyContent,
  verifyCategories,
  create);

module.exports = blogpost;
