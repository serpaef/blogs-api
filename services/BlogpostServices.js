const { Op } = require('sequelize');
const { BlogPost, PostsCategory, Category, User } = require('../models');

async function create(payload, categoryIds) {
  const newPost = await BlogPost.create(payload);

  await Promise.all(
    categoryIds.map(
      async (cat) => PostsCategory.create({ postId: newPost.dataValues.id, categoryId: cat }),
    ),
  );
    
  return newPost.dataValues;
}

async function getAll() {
  const posts = await BlogPost.findAll({
    include: [
      { model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, as: 'categories' },
    ],
  });

  const treatedPosts = posts.map((post) => ({ ...post.dataValues, user: post.user.dataValues }));
  return treatedPosts;
}

async function getById(id) {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, as: 'categories' },
    ],
  });
  if (!post) return false;
  const treatedPost = { ...post.dataValues, user: post.user.dataValues };
  return treatedPost;
}

async function updatePost(id, payload) {
  await BlogPost.update(payload, { where: { id } });
}

async function deletePost(id) {
  await BlogPost.destroy({ where: { id } });
}

async function findPosts(query) {
  const posts = await BlogPost.findAll({
    where: { 
      [Op.or]: {
        title: { [Op.substring]: query },
        content: { [Op.substring]: query }, 
      },
    },
    include: [
      { model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, as: 'categories' },
    ],
  });
  
  return posts;
}

module.exports = {
  create,
  getAll,
  getById,
  updatePost,
  deletePost,
  findPosts,
};
