const Talents = require('../../api/v1/talents/model');
const { getImageById } = require('./images');
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllTalents = async (req) => {
  const { keyword } = req.query;
  const { organizer } = req.user;

  let conditions = { organizer };

  if (keyword) {
    conditions = { ...conditions, name: { $regex: keyword, $options: 'i' } };
  }

  const result = await Talents.find(conditions)
    .populate({ path: 'image', select: '_id url' })
    .select('_id name role image');

  return result;
};

const getTalentById = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`No talents found with id ${id}.`);
  }

  return result;
};

const getTalentByIdAndOrganizer = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;

  const result = await Talents.findOne({ _id: id, organizer })
    .populate({ path: 'image', select: '_id url' })
    .select('_id name role image');

  if (!result) {
    throw new NotFoundError(`No talents found with id ${id}.`);
  }

  return result;
};

const createTalent = async (req) => {
  const { name, role, imageId } = req.body;
  const { organizer } = req.user;

  await getImageById(imageId);

  const check = await Talents.findOne({ name, organizer });

  if (check) {
    throw new BadRequestError('Talent name already exist.');
  }

  const result = await Talents.create({
    name,
    role,
    image: imageId,
    organizer,
  });

  return result;
};

const updateTalent = async (req) => {
  const { id } = req.params;
  const { name, role, imageId } = req.body;
  const { organizer } = req.user;

  await getImageById(imageId);

  const check = await Talents.findOne({ _id: { $ne: id }, name, organizer });

  if (check) {
    throw new BadRequestError('Talent name already exist.');
  }

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, role, image: imageId, organizer },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new NotFoundError(`No talents found with id ${id}.`);
  }

  return result;
};

const deleteTalent = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;

  const result = await Talents.findOneAndRemove({ _id: id, organizer });

  if (!result) {
    throw new NotFoundError(`No talents found with id ${id}.`);
  }

  return result;
};

module.exports = {
  getAllTalents,
  getTalentById,
  getTalentByIdAndOrganizer,
  createTalent,
  updateTalent,
  deleteTalent,
};
