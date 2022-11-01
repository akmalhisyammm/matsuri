const mongoose = require('mongoose');

const ticketCategoriesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Ticket type is required.'],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  expired: {
    type: Date,
  },
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: [true, 'Event title is required.'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required.'],
    },
    about: {
      type: String,
    },
    tagline: {
      type: String,
      required: [true, 'Event tagline is required.'],
    },
    keypoint: {
      type: [String],
    },
    venueName: {
      type: String,
      required: [true, 'Event venue name is required.'],
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: 'Talent',
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'Organizer',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
