const Categories = require('../../api/v1/categories/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllCategories = async (req) => {
  const { organizer } = req.user;

  const result = await Categories.find({ organizer });

  return result;
};



const getCategoryByIdAndOrganizer = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;

  const result = await Categories.findOne({ _id: id, organizer });

  if (!result) {
    throw new NotFoundError('Category not found.');
  }

  return result;
};

const createCategory = async (req) => {
  const { name } = req.body;
  const { organizer } = req.user;

  const check = await Categories.findOne({ name, organizer });

  if (check) {
    throw new BadRequestError('Category name already exist.');
  }

  const result = await Categories.create({ name, organizer });

  return result;
};

const updateCategory = async (req) => {
  const { id } = req.params;
  const { name } = req.body;
  const { organizer } = req.user;

  const check = await Categories.findOne({ _id: { $ne: id }, name, organizer });

  if (check) {
    throw new BadRequestError('Category name already exist.');
  }

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new NotFoundError('Category not found.');
  }

  return result;
};

const deleteCategory = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;

  const result = await Categories.findOneAndRemove({ _id: id, organizer });

  if (!result) {
    throw new NotFoundError('Category not found.');
  }

  return result;
};

const checkCategory = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError('Category not found.');
  }

  return result;
};

module.exports = {
  getAllCategories,
  getCategoryByIdAndOrganizer,
  createCategory,
  updateCategory,
  deleteCategory,
  checkCategory,
};
