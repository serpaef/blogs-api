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
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const payload = { userId: id, title, content };

    const newPost = await BlogPostServices.create(payload, categoryIds);

    return res.status(201).json(newPost);
  } catch ({ message }) {
    console.error(message);
    return res.status(500).json({ message: 'Server error, try again in a few minutes' });
  }
}

async function getAll(_req, res) {
  try {
    const posts = await BlogPostServices.getAll();

    return res.status(200).json(posts);
  } catch (e) {
    console.log(`\n\n*${e.message}*\n\n`);
    return res.status(500).json({ message: 'Server error, try again in a few minutes' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const post = await BlogPostServices.getById(id);
    if (!post || post === null) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(post);
  } catch (e) {
    console.log(`\n\n*${e.message}*\n\n`);
    return res.status(500).json({ message: 'Server error, try again in a few minutes' });
  }
}

blogpost.post('/',
  Auth,
  verifyTitle,
  verifyContent,
  verifyCategories,
  create)
.get('/:id',
  Auth,
  getById)
.get('/',
  Auth,
  getAll);

module.exports = blogpost;
