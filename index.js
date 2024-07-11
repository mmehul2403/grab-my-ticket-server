const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress, GraphQLUpload } = require("graphql-upload");
const sequelizeDatabase = require("./config/database");

const dbconfig = require("./config/database_config.json")[
  process.env.NODE_ENV || "development"
];

const MovieRoutes = require("./routes/MovieRoute");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

// const index = require("./models/index");

// Sync the Movie model with the database
sequelizeDatabase.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

async function startServer() {
  const app = express();
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.use(graphqlUploadExpress());
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
  app.use(
    session({
      secret: "Grab my ticket session.",
      resave: true,
      saveUninitialized: true,
      store: session_store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
  const typesArray = loadFilesSync(path.join(__dirname, "./schema"));

  let mergeTypeDefsRes = mergeTypeDefs(typesArray);
  const resolversArr = loadFilesSync(path.join(__dirname, "./resolvers"));
  let mergeResolversRes = mergeResolvers(resolversArr);

  const server = new ApolloServer({
    typeDefs: mergeTypeDefsRes,
    resolvers: mergeResolversRes,
    context: { sequelizeDatabase },
    uploads: false, //I disabled built in upload handeling of GraphQL
    context: async ({ req, res }) => ({
      req,
      res,
    }),
  });

  try {
    await sequelizeDatabase.authenticate();
    console.log("Database connection has been established successfully.");

    //app.use("/movies", MovieRoutes);

    await server.start();
    server.applyMiddleware({
      app,
      cors: {
        origin: "http://localhost:3000", // Adjust to your client URL
        credentials: true,
      },
    });

    app.listen({ port: 4000 }, () => {
      console.log("Server started on http://localhost:4000/graphql");
    });
  } catch (error) {
    console.error("Error occurred while starting server:", error);
    process.exit(1);
  }
}

startServer();
