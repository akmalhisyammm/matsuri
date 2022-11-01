const Events = require('../../api/v1/events/model');
const { getCategoryById } = require('./categories');
const { getImageById } = require('./images');
const { getTalentById } = require('./talents');
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllEvents = async (req) => {
  const { keyword, status, categoryId, talentId } = req.query;
  const { organizer } = req.user;

  let conditions = { organizer };

  if (keyword) {
    conditions = { ...conditions, title: { $regex: keyword, $options: 'i' } };
  }

  if (['Draft', 'Published'].includes(status)) {
    conditions = { ...conditions, status };
  }

  if (categoryId) {
    conditions = { ...conditions, category: categoryId };
  }

  if (talentId) {
    conditions = { ...conditions, talent: talentId };
  }

  const result = await Events.find(conditions)
    .populate({ path: 'image', select: '_id url' })
    .populate({ path: 'category', select: '_id name' })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: { path: 'image', select: '_id url' },
    });

  return result;
};

const getEventByIdAndOrganizer = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;

  const result = await Events.findOne({ _id: id, organizer })
    .populate({ path: 'image', select: '_id url' })
    .populate({ path: 'category', select: '_id name' })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: { path: 'image', select: '_id url' },
    });

  if (!result) {
    throw new NotFoundError(`No events found with id ${id}.`);
  }

  return result;
};

const createEvent = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    keypoint,
    venueName,
    status,
    tickets,
    imageId,
    categoryId,
    talentId,
  } = req.body;
  const { organizer } = req.user;

  await getImageById(imageId);
  await getCategoryById(categoryId);
  await getTalentById(talentId);

  const check = await Events.findOne({ title });

  if (check) {
    throw new BadRequestError('Event title already exist.');
  }

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keypoint,
    status,
    tickets,
    image: imageId,
    category: categoryId,
    talent: talentId,
    organizer,
  });

  return result;
};

const updateEvent = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagline,
    keypoint,
    venueName,
    status,
    tickets,
    imageId,
    categoryId,
    talentId,
  } = req.body;
  const { organizer } = req.user;

  await getImageById(imageId);
  await getCategoryById(categoryId);
  await getTalentById(talentId);

  const checkCurrent = await Events.findOne({ _id: id });

  if (!checkCurrent) {
    throw new NotFoundError(`No events found with id ${id}.`);
  }

  const checkOther = await Events.findOne({
    _id: { $ne: id },
    title,
    organizer,
  });

  if (checkOther) {
    throw new BadRequestError('Event title already exist.');
  }

  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keypoint,
      status,
      tickets,
      image: imageId,
      category: categoryId,
      talent: talentId,
      organizer,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteEvent = async (req) => {
  const { id } = req.params;
  const { organizer } = req.user;

  const result = await Events.findOneAndRemove({ _id: id, organizer });

  if (!result) {
    throw new NotFoundError(`No events found with id ${id}.`);
  }

  return result;
};

const updateEventStatus = async (req) => {
  const { id } = req.params;
  const { status } = req.body;
  const { organizer } = req.user;

  if (!['Draft', 'Published'].includes(status)) {
    throw new BadRequestError('Status must be Draft or Published.');
  }

  const result = await Events.findOne({ _id: id, organizer });

  if (!result) {
    throw new NotFoundError(`No events found with id ${id}.`);
  }

  result.status = status;

  await result.save();

  return result;
};

module.exports = {
  getAllEvents,
  getEventByIdAndOrganizer,
  createEvent,
  updateEvent,
  updateEventStatus,
  deleteEvent,
};
