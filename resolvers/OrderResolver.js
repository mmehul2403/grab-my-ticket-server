const { Op } = require("sequelize");
const sequelizeDatabase = require("../config/database");
const moment = require("moment");
const Cinema = require("../models/Cinema")(sequelizeDatabase);
const City = require("../models/City")(sequelizeDatabase);
const Province = require("../models/Province")(sequelizeDatabase);
const OrderTable = require("../models/OrderTable")(sequelizeDatabase);
const ShowTime = require("../models/ShowTime")(sequelizeDatabase);

const OrderResolver = {
  Query: {
    getOrderDetail: async (_, { order_id }) => {
      return await OrderTable.findByPk(order_id);
    },

    getOrdersByUserId: async (_, args, ctx) => {
      let session_user_id = ctx.req.session.userId;
      return await OrderTable.findAll({
        where: {
          user_id: {
            [Op.eq]: session_user_id,
          },
        },
      });
    },
  },
  Mutation: {
    createOrder: async (_, { ticket_num, show_time_id }, ctx) => {
      let session_user_id = ctx.req.session.userId;
      // let session_user_id = 5;//fake data for userId
      let ticket_amount =
        ticket_num * (await ShowTime.findByPk(show_time_id)).ticket_price;
      let book_date = moment().format("YYYY-MM-DD");
      return await OrderTable.create({
        ticket_num,
        ticket_amount,
        book_date,
        show_time_id,
        user_id: session_user_id,
      });
    },
  },
  OrderDetail: {
    show_time: async (show_time) => {
      return await ShowTime.findByPk(show_time.show_time_id);
    },
  },
};

module.exports = OrderResolver;
