const { gql } = require("apollo-server-express");

// ！means that the field is non-nullable.
const typeDefs = gql`

type Query {
  message: String!
}

type text {
  text: String!
}

type Mutation {
  sendText(text: String!): text
}
`;


module.exports = typeDefs;
