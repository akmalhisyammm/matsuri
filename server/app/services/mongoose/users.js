const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizers/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllOrganizerUsers = async (req) => {
  const { organizer } = req.user;

  const result = await Users.find({ role: 'Organizer', organizer: { $ne: organizer } })
    .populate({ path: 'organizer', select: '_id name' })
    .select('_id name email role organizer');

  return result;
};

const getAllAdminUsers = async (req) => {
  const { organizer } = req.user;

  const result = await Users.find({ role: 'Admin', organizer })
    .populate({ path: 'organizer', select: '_id name' })
    .select('_id name email role organizer');

  return result;
};

const createOrganizerUser = async (req) => {
  const { name, email, password, organizerName } = req.body;

  const checkOrganizer = await Organizers.findOne({ name: organizerName });

  if (checkOrganizer) {
    throw new BadRequestError('Organizer name already exist.');
  }

  const checkUser = await Users.findOne({ email });

  if (checkUser) {
    throw new BadRequestError('User email already exist.');
  }

  const organizer = await Organizers.create({ name: organizerName });

  const result = await Users.create({
    name,
    email,
    password,
    role: 'Organizer',
    organizer: organizer._id,
  });

  delete result._doc.password;

  return result;
};

const createAdminUser = async (req) => {
  const { name, email, password } = req.body;
  const { organizer } = req.user;

  const check = await Users.findOne({ email });

  if (check) {
    throw new BadRequestError('User email already exist.');
  }

  const result = await Users.create({ name, email, password, role: 'Admin', organizer });

  delete result._doc.password;

  return result;
};

const updateOrganizerUser = async (req) => {
  const { id } = req.params;
  const { name, email, password, organizerName } = req.body;

  const user = await Users.findOne({ _id: id, role: 'Organizer' });

  const checkOrganizer = await Organizers.findOne({
    _id: { $ne: user.organizer },
    name: organizerName,
  });

  if (checkOrganizer) {
    throw new BadRequestError('Organizer name already exist.');
  }

  const checkUser = await Users.findOne({ _id: { $ne: id }, email });

  if (checkUser) {
    throw new BadRequestError('User email already exist.');
  }

  const organizer = await Organizers.findOneAndUpdate(
    { _id: user.organizer },
    { name: organizerName },
    { new: true, runValidators: true }
  );

  if (!organizer) {
    throw new BadRequestError('Organizer not found.');
  }

  const result = await Users.findOneAndUpdate(
    { _id: id },
    { name, email, password },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new NotFoundError('User not found.');
  }

  delete result._doc.password;

  return result;
};

const updateAdminUser = async (req) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const { organizer } = req.user;

  const check = await Users.findOne({ _id: { $ne: id }, email });

  if (check) {
    throw new BadRequestError('User email already exist.');
  }

  const result = await Users.findOneAndUpdate(
    { _id: id },
    { name, email, password, organizer },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new NotFoundError('User not found.');
  }

  delete result._doc.password;

  return result;
};

const deleteOrganizerUser = async (req) => {
  const { id } = req.params;

  const result = await Users.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError('User not found.');
  }

  const organizer = await Organizers.findOne({ _id: result.organizer });

  if (!organizer) {
    throw new BadRequestError('Organizer not found.');
  }

  await Users.deleteMany({ organizer: organizer._id });
  await Organizers.deleteOne({ _id: organizer._id });

  delete result._doc.password;

  return result;
};

const deleteAdminUser = async (req) => {
  const { id } = req.params;

  const result = await Users.findOneAndDelete({ _id: id });

  if (!result) {
    throw new NotFoundError('User not found.');
  }

  delete result._doc.password;

  return result;
};

module.exports = {
  getAllOrganizerUsers,
  getAllAdminUsers,
  createOrganizerUser,
  createAdminUser,
  updateOrganizerUser,
  updateAdminUser,
  deleteOrganizerUser,
  deleteAdminUser,
};
