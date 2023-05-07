const { gql } = require("apollo-server-express");

// ！means that the field is non-nullable.
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    polyCount: Int
    savedPolys: [Poly]
  }

  type Poly {
    polyId: String!
    description: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input PolyInput {
    polyId: String!
    description: String
    title: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePoly(input: PolyInput): User
    removePoly(polyId: String!): User
  }
`;

module.exports = typeDefs;
