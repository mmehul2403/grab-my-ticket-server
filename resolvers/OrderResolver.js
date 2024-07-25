const { Op } = require("sequelize");
const sequelizeDatabase = require("../config/database");
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

    getOrdersByUserId: async (_, args) => {
      return await OrderTable.findAll({
        where: {
          user_id: {
            [Op.eq]: args.user_id,
          },
        },
      });
    },
  },
  Mutation: {
    createOrder: async (_, { ticket_num, ticket_amount, book_date, show_time_id }, ctx) => {
      // let session_user_id = ctx.req.session.userId;
      let session_user_id = 5;
      await OrderTable.create({
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
