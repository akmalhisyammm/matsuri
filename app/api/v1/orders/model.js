const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  ticketCategories: {
    type: {
      type: String,
      required: [true, 'Ticket category type is required.'],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  totalTicket: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    personalDetail: {
      firstName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: [true, 'First name is required.'],
      },
      lastName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: [true, 'Last name is required.'],
      },
      email: {
        type: String,
        required: [true, 'Email is required.'],
      },
      role: {
        type: String,
        default: 'Designer',
      },
    },
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    totalPay: {
      type: Number,
      required: true,
    },
    totalOrderTicket: {
      type: Number,
      required: true,
    },
    orderItems: [orderDetailSchema],
    participant: {
      type: mongoose.Types.ObjectId,
      ref: 'Participant',
      required: true,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    eventHistory: {
      title: {
        type: String,
        required: [true, 'Event title is required.'],
        minLength: 3,
        maxLength: 50,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
