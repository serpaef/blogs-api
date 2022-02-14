const BlogPost = (sequelize, Datatypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    userId: Datatypes.INTEGER,
  }, {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return blogPost;
};

module.exports = BlogPost;
