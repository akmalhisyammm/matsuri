const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../errors');

const createImage = async (req) => {
  const imageUrl = req.file ? `uploads/${req.file.filename}` : 'uploads/placeholder/avatar.png';

  const result = await Images.create({ url: imageUrl });

  return result;
};

const getImageById = async (id) => {
  const result = await Images.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`No images found with id ${id}.`);
  }

  return result;
};

module.exports = { createImage, getImageById };
