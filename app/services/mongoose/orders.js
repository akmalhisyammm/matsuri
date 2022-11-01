const Orders = require('../../api/v1/orders/model');

const getAllOrders = async (req) => {
  const { limit = 10, page = 1, startDate, endDate } = req.query;
  const { role, organizer } = req.user;

  let conditions = {};

  if (role !== 'Owner') {
    conditions = { ...conditions, 'eventHistory.organizer': organizer };
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(0, 0, 0);
    end.setHours(23, 59, 59);

    conditions = { ...conditions, date: { $gte: start, $lt: end } };
  }

  const result = await Orders.find(conditions)
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Orders.countDocuments(conditions);

  return { data: result, pages: Math.ceil(count / limit), total: count };
};

module.exports = { getAllOrders };
