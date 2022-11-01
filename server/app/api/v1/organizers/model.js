const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Organizer name is required.'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Organizer', organizerSchema);
