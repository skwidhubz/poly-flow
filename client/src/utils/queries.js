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
`

export const LOAD_DATA = gql`
query Params {
  params {
    _id
    params
  }
  me {
    _id
  }
}
`

export const LOAD_PARAMS = gql`
query Load {
  params {
    _id
    params
  }
  me {
    _id
  }
}`


export const CIRCLE_LOAD = gql`
query Query($circleId: String!) {
  circleLoad(circleId: $circleId) {
    _id
    params
  }
}`
;
