const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const participantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: [true, 'First name is required.'],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minLength: 6,
    },
    role: {
      type: String,
      default: '-',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Inactive',
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

participantSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

participantSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 12);
  }

  next();
});

participantSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);

  return isMatch;
};

module.exports = mongoose.model('Participant', participantSchema);
