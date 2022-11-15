const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required.'],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, 'Password is required.'],
    },
    role: {
      type: String,
      enum: ['Admin', 'Organizer', 'Owner'],
      default: 'Admin',
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'Organizer',
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 12);
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);

  return isMatch;
};

module.exports = mongoose.model('User', userSchema);
