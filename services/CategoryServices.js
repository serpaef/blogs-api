const { Category } = require('../models');

async function create(name) {
  const category = await Category.create({ name });
  return category.dataValues;
}

module.exports = {
  create,
};
