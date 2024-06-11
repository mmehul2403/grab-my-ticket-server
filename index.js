const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const sequelizeDatabase = require("./config/database");
const MovieRoutes = require("./routes/MovieRoute");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");

const index = require("./models/index");

// Sync the Movie model with the database
sequelizeDatabase.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

async function startServer() {
  const app = express();
  app.use(bodyParser.json());

  const typesArray = loadFilesSync(path.join(__dirname, "./schema"));

  let mergeTypeDefsRes = mergeTypeDefs(typesArray);
  const resolversArr = loadFilesSync(path.join(__dirname, "./resolvers"));
  let mergeResolversRes = mergeResolvers(resolversArr);

  const server = new ApolloServer({
    typeDefs: mergeTypeDefsRes,
    resolvers: mergeResolversRes,
    context: { sequelizeDatabase },
  });

  try {
    // Test database connection
    await sequelizeDatabase.authenticate();
    console.log("Database connection has been established successfully.");

    app.use("/movies", MovieRoutes);

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log("Server started on http://localhost:4000/graphql");
    });
  } catch (error) {
    console.error("Error occurred while starting server:", error);
    process.exit(1);
  }
}

startServer();
