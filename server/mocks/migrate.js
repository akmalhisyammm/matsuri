const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Category = require('../app/api/v1/categories/model');
const Event = require('../app/api/v1/events/model');
const Image = require('../app/api/v1/images/model');
const Order = require('../app/api/v1/orders/model');
const Organizer = require('../app/api/v1/organizers/model');
const Participant = require('../app/api/v1/participants/model');
const Payment = require('../app/api/v1/payments/model');
const Talent = require('../app/api/v1/talents/model');
const User = require('../app/api/v1/users/model');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

mongoose
  .connect(`${process.env.MONGODB_URL}`, { dbName: process.env.MONGODB_NAME })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error with code:', err);
  });

const categories = JSON.parse(fs.readFileSync(`${__dirname}/categories.json`, 'utf-8'));
const events = JSON.parse(fs.readFileSync(`${__dirname}/events.json`, 'utf-8'));
const images = JSON.parse(fs.readFileSync(`${__dirname}/images.json`, 'utf-8'));
const orders = JSON.parse(fs.readFileSync(`${__dirname}/orders.json`, 'utf-8'));
const organizers = JSON.parse(fs.readFileSync(`${__dirname}/organizers.json`, 'utf-8'));
const participants = JSON.parse(fs.readFileSync(`${__dirname}/participants.json`, 'utf-8'));
const payments = JSON.parse(fs.readFileSync(`${__dirname}/payments.json`, 'utf-8'));
const talents = JSON.parse(fs.readFileSync(`${__dirname}/talents.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const importData = async () => {
  try {
    await Image.create(images);
    await Organizer.create(organizers);
    await Category.create(categories);
    await Payment.create(payments);
    await Talent.create(talents);
    await Event.create(events);
    await User.create(users);
    await Participant.create(participants);
    await Order.create(orders);

    console.log('Data imported successfully!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

const deleteData = async () => {
  try {
    await Image.deleteMany();
    await Organizer.deleteMany();
    await Category.deleteMany();
    await Payment.deleteMany();
    await Talent.deleteMany();
    await Event.deleteMany();
    await User.deleteMany();
    await Participant.deleteMany();
    await Order.deleteMany();

    console.log('Data deleted successfully!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log(
    'Please use the --import or --delete flag to import or delete data. Example: node mocks/migrate --delete'
  );
}
