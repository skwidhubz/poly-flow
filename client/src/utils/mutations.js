import { gql } from "@apollo/client";

export const SAVE_DATA = gql`
  mutation saveData($Params: String!) {
    saveData(input: {params: $Params}) {
        username
    }
  }`

export const LOAD_DATA = gql`
query allData {
  loaddData {
    params
  }
}`

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_POLY = gql`
  mutation savePoly($input: PolyInput) {
    savePoly(input: $input) {
      _id
      username
      polyCount
      savedPolys {
        polyId
        title
        description
      }
    }
  }
`;

export const REMOVE_POLY = gql`
  mutation removePoly($polyId: String!) {
    removePoly(polyId: $polyId) {
      _id
      username
      polyCount
      savedPolys {
        polyId
        title
        description
      }
    }
  }
`;
