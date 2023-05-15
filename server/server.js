const express = require("express");
const path = require("path");
const db = require("./config/connection");
require('dotenv').config();

// add apollo server
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

// add apollo middleware
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

  db.once("open", () => {
    app.listen(PORT, () => console.log(`server listening on localhost:${PORT}`));
  });

};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../client/build")));
// };

console.log(process.env.NODE_ENV);

startServer();
