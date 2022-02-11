const { BlogPost } = require('../models');

async function create(payload) {
  const newPost = await BlogPost.create(payload);
  return newPost.dataValues;
}

module.exports = { create };
