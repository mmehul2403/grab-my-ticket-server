const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const sequelize = require("./config/database");
const Data = require("./models/Data");

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

const resolvers = {
  Query: {
    data: async () => await Data.findAll(),
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  // Syncing the database without dropping tables
  sequelize
    .sync()
    .then(async () => {
      console.log("Database connected and synced.");

      // Check if the database is empty before inserting sample data
      const dataCount = await Data.count();
      if (dataCount === 0) {
        await Data.create({ value: "First value" });
        await Data.create({ value: "Second value" });
      }

      app.listen({ port: 4000 }, () =>
        console.log(
          `Server ready at http://localhost:4000${server.graphqlPath}`
        )
      );
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}

startServer();
