const { BlogPost, PostsCategory } = require('../models');

async function create(payload, categoryIds) {
  const newPost = await BlogPost.create(payload);

  await Promise.all(
    categoryIds.map(
      async (cat) => PostsCategory.create({ postId: newPost.dataValues.id, categoryId: cat }),
    ),
  );
    
  return newPost.dataValues;
}

module.exports = { create };
