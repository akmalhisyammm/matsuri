const Organizers = require('../../api/v1/organizers/model');
const Users = require('../../api/v1/users/model');
const { BadRequestError } = require('../../errors');

const createOrganizer = async (req) => {
  const { name, email, password, confirmPassword, role, organizerName } =
    req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password and confirm password do not match.');
  }

  const result = await Organizers.create({ organizerName });

  const user = await Users.create({
    name,
    email,
    password,
    role,
    organizerId: result._id,
  });

  delete user._doc.password;

  return user;
};

module.exports = { createOrganizer };
