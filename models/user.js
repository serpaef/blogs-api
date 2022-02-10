const User = (sequelize, Datatypes) => {
  const user = sequelize.define('User', {
    displayName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  }, {
    timestamps: false,
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost,
      { foreignkey: 'userId', as: 'BlogPosts' });
  };
  
  return user;
};

module.exports = User;
