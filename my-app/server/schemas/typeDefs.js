const { gql } = require("apollo-server-express");

// ！means that the field is non-nullable.
const typeDefs = gql`

type Query {
  message: String!
}

`;

// type User {
//     _id: ID
//     username: String
//     email: String
//     bookCount: Int
//     savedBooks: [Book]
//   }

module.exports = typeDefs;
