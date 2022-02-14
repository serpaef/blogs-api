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

module.exports = {
  create,
  getAll,
  getById,
  updatePost,
};
