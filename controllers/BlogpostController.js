require('dotenv').config();

const express = require('express');

const Auth = require('./Auth');

const blogpost = express.Router();

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

blogpost.post('/',
  Auth,
  verifyTitle,
  verifyContent);

module.exports = blogpost;
