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

module.exports = { create, getAll };
