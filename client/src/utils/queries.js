import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      slates {
        _id
        name
      }
    }
  }
`;


export const QUERY_SLATES = gql`
  query slates {
    slates {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      slates{
        _id
        name
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      slates{
        _id
        name
      }
    }
  }
`;
