const Category = (sequelize, Datatypes) => {
  const category = sequelize.define('Category', {
    name: Datatypes.STRING,
  }, {
    timestamps: false,
  });

  return category;
};

module.exports = Category;
