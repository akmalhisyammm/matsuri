const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
