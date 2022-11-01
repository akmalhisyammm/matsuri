const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, 'Category name must be at least 3 characters long.'],
      maxLength: [20, 'Category name must be at most 20 characters long.'],
      required: [true, 'Category name is required.'],
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'Organizer',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
