const PostsCategory = (sequelize, _Datatypes) => {
  const postsCategory = sequelize.define('PostsCategory', 
    {},
    { timestamps: false });

  postsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: postsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postsCategory;
};

module.exports = PostsCategory;
