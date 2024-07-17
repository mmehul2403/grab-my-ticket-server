const sequelizeDatabase = require("../config/database");
const User = require("../models/User")(sequelizeDatabase);

const resolvers = {
  Query: {
    getAllUsers: async (_, { page, limit }) => {
      const offset = (page - 1) * limit;
      const users = await User.findAll({
        offset,
        limit,
      });
      const totalCount = await User.count();
      return {
        users,
        totalCount,
      };
    },
  },
  Mutation: {
    updateUserOperation: async (_, { input }) => {
      const { user_id, ...updateFields } = input;
      console.log(
        "Mehul update user called :",
        user_id + " updateFields : " + updateFields
      );
      await User.update(updateFields, { where: { user_id } });
      return User.findByPk(user_id);
    },
  },
};

module.exports = resolvers;
