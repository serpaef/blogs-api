const { Category } = require('../models');

async function create(name) {
  const category = await Category.create({ name });
  return category.dataValues;
}

async function getAll() {
  const categories = await Category.findAll();
  const treatedCategories = categories.map((category) => category.dataValues);
  return treatedCategories;
}

module.exports = {
  create,
  getAll,
};
