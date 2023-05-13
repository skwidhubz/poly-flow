import { gql } from "@apollo/client";

// LIBRARY QUERY (per user)

export const GET_ALL = gql`
query Me {
  me {
    savedData {
      _id
      params
    }
  }
}`

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

export const LOAD_DATA = gql`
query Params {
  params {
    _id
    params
  }
}
`

export const LOAD_PARAMS = gql`
query Load {
  param {
    _id
    params
  }
}`
