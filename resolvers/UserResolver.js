const sequelizeDatabase = require("../config/database");
const User = require("../models/User")(sequelizeDatabase);
const bcrypt = require("bcryptjs-react");
const UserResolver = {
  Query: {
    getUserById: async (_, args) => {
      return await User.findByPk(args.user_id);
    },
    validateEmail: async (_, args) => {
      return await User.findByPk(args.user_id);
    },
    signIn: async (_, args, ctx) => {
      let user = await User.findOne({
        attributes: ["password", "user_id"],
        where: {
          email_address: args.email_address,
        },
      });

      if (!user) {
        return { code: 1, message: "username or password is not correct." };
      }
      let isvalid = bcrypt.compareSync(args.password, user.password);
      if (isvalid) {
        // req.session.loginUserType = userType;

        ctx.req.session.userId = user.user_id;
        // req.session.isValidated = true;
        console.log(" ctx.req.session.userId:" + ctx.req.session.userId);
        return { code: 0, message: "success" };
      } else {
        return { code: 1, message: "username or password is not correct." };
      }
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      let newUser = args.user;
      newUser.role = 0;
      newUser.lock_status = 0;

      return await User.create(newUser);
      // return 1;
    },
    updateUser: async (_, args) => {
      const user = await User.findByPk(args.user_id);
      if (!user) throw new Error("User not found");
      await user.update(args);
      return user;
    },
    deleteUser: async (_, args) => {
      const user = await User.findByPk(args.user_id);
      if (!user) throw new Error("User not found");
      await user.destroy();
      return user;
    },
  },
};

module.exports = UserResolver;
