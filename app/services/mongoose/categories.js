const Categories = require('../../api/v1/categories/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllCategories = async (req) => {
  const { organizerId } = req.user;

  const result = await Categories.find({ organizerId });

  return result;
};

const getCategoryById = async (req) => {
  const { id } = req.params;
  const { organizerId } = req.user;

  const result = await Categories.findOne({ _id: id, organizerId });

  if (!result) {
    throw new NotFoundError(`No categories found with id ${id}.`);
  }

  return result;
};

const createCategory = async (req) => {
  const { name } = req.body;
  const { organizerId } = req.user;

  const check = await Categories.findOne({ name, organizerId });

  if (check) {
    throw new BadRequestError('Category name already exist.');
  }

  const result = await Categories.create({ name, organizerId });

  return result;
};

const updateCategory = async (req) => {
  const { id } = req.params;
  const { name } = req.body;
  const { organizerId } = req.user;

  const check = await Categories.findOne({
    _id: { $ne: id },
    name,
    organizerId,
  });

  if (check) {
    throw new BadRequestError('Category name already exist.');
  }

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new NotFoundError(`No categories found with id ${id}.`);
  }

  return result;
};

const deleteCategory = async (req) => {
  const { id } = req.params;
  const { organizerId } = req.user;

  const result = await Categories.findOneAndRemove({ _id: id, organizerId });

  if (!result) {
    throw new NotFoundError(`No categories found with id ${id}.`);
  }

  return result;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
