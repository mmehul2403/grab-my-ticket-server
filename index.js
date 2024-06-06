const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const sequelize = require("./config/database");

// Grab the Data model from the models directory
const { Data } = require("./models");

// Sample typeDefs and resolvers
const typeDefs = gql`
  type Query {
    data: [Data]
  }

  type Data {
    id: ID
    value: String
  }
`;

// Find all data from the Data table
const resolvers = {
  Query: {
    data: async () => await Data.findAll(),
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  try {
    // Sync database
    await sequelize.authenticate(); // Test database connection
    console.log("Database connection has been established successfully.");

    await sequelize.sync({ force: false });
    console.log("Database tables are created.");

    const dataCount = await Data.count();
    if (dataCount === 0) {
      await Data.create({ value: "First value" });
      await Data.create({ value: "Second value" });
    }

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log("Server started on http://localhost:4000/graphql");
    });
  } catch (error) {
    console.error("Error occurred while starting server:", error);
    process.exit(1); // Exit the application with a non-zero exit code
  }
}

startServer();
