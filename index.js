const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const sequelizeDatabase = require("./config/database");
const mongoose = require("mongoose");

const dbconfig = require("./config/db_config.json")[
  process.env.NODE_ENV || "mehul-dev"
];

const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");

// MongoDB connection setup
mongoose
  .connect(dbconfig.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Load the Mongoose models
const Order = require("./models/OrderSchemaMongo");

sequelizeDatabase.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

async function startServer() {
  const app = express();
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.use(bodyParser.json());

  const session_store = new MongoDBStore(
    {
      uri: dbconfig.mongoUrl,
      databaseName: "grabmyticket",
      collection: "user_session",
    },
    function (error) {
      console.log(error);
    }
  );

  session_store.on("error", function (error) {
    console.log("###" + error);
  });

  const allowedOrigins = [
    "https://studio.apollographql.com",
    "http://localhost:3000",
  ];
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use(
    session({
      secret: "Grab my ticket session.",
      resave: true,
      saveUninitialized: true,
      store: session_store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false, // set to true if using HTTPS
      },
    })
  );

  app.use(graphqlUploadExpress());

  const typesArray = loadFilesSync(path.join(__dirname, "./schema"));
  const mergeTypeDefsRes = mergeTypeDefs(typesArray);
  const resolversArr = loadFilesSync(path.join(__dirname, "./resolvers"));
  const mergeResolversRes = mergeResolvers(resolversArr);

  const server = new ApolloServer({
    typeDefs: mergeTypeDefsRes,
    resolvers: mergeResolversRes,
    uploads: false, // Disable built-in upload handling
    context: async ({ req, res }) => ({
      req,
      res,
      sequelizeDatabase,
      mongooseModels: {
        Order, // Add the Order model to context
      },
    }),
  });

  try {
    await sequelizeDatabase.authenticate();
    console.log("Database connection has been established successfully.");
    await server.start();

    server.applyMiddleware({ app, path: "/graphql", cors: false });

    app.listen({ port: 4000 }, () => {
      console.log("Server started on http://localhost:4000/graphql");
    });
  } catch (error) {
    console.error("Error occurred while starting server:", error);
    process.exit(1);
  }
}

startServer();
