import { gql } from "@apollo/client";

// LIBRARY QUERY (per user)

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedPolys {
        polyId
        description
        title
      }
    }
  }
`;
