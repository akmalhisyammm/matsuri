const Users = require('../../api/v1/users/model');
const { BadRequestError } = require('../../errors');

const getAllUsers = async () => {
  const result = await Users.find();

  return result;
};

const createUser = async (req) => {
  const { name, email, password, confirmPassword, role } = req.body;
  const { organizer } = req.user;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password and confirm password do not match.');
  }

  const result = await Users.create({ name, email, password, role, organizer });

  return result;
};

module.exports = { getAllUsers, createUser };
