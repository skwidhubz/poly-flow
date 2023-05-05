const { gql } = require("apollo-server-express");

// ！means that the field is non-nullable.
const typeDefs = gql`

type Query {
  message: String!
}

type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [Book] // CHANGE TO POLY
}

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(input: BookInput): User          // CHANGE TO POLY
  removeBook(bookId: String!): User         // CHANGE TO POLY
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
