const Organizers = require('../../api/v1/organizers/model');
const { BadRequestError } = require('../../errors');

const getAllOrganizers = async () => {
  const result = await Organizers.find();

  return result;
};

const createOrganizer = async (req) => {
  const { name } = req.body;

  const check = await Organizers.findOne({ name });

  if (check) {
    throw new BadRequestError('Organizer name already exist.');
  }

  const result = await Organizers.create({ name });

  return result;
};

const updateOrganizer = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Organizers.findOne({ _id: { $ne: id }, name });

  if (check) {
    throw new BadRequestError('Organizer name already exist.');
  }

  const result = await Organizers.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new BadRequestError('Organizer not found.');
  }

  return result;
};

const deleteOrganizer = async (req) => {
  const { id } = req.params;

  const result = await Organizers.findOneAndDelete({ _id: id });

  if (!result) {
    throw new BadRequestError('Organizer not found.');
  }

  return result;
};

const checkOrganizer = async (id) => {
  const result = await Organizers.findOne({ _id: id });

  if (!result) {
    throw new BadRequestError('Organizer not found.');
  }

  return result;
};

module.exports = {
  getAllOrganizers,
  createOrganizer,
  updateOrganizer,
  deleteOrganizer,
  checkOrganizer,
};
