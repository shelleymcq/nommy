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
        restaurants{
          restaurantId
          name
          category
          link
          image
          distance
        }
      }
      friends{
        _id
        username
      }
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
        restaurants{
          restaurantId
          name
          category
          link
          image
          distance
        }
      }
      friends{
        _id
        username
      }
    }
  }
`;

export const QUERY_USER_BY_NAME = gql`
  query userByName($username: String!) {
    userByName(username: $username) {
      _id
      username
      email
      slates{
        _id
        name
        restaurants{
          restaurantId
          name
          category
          link
          image
          distance
        }
      }
      friends{
        _id
        username
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
        restaurants{
          restaurantId
          name
          category
          link
          image
          distance
        }
      }
      friends{
        _id
        username
      }
    }
  }
`;

export const QUERY_SLATES = gql`
  query slates {
    slates {
      _id
      name
      restaurants {
        restaurantId
        name
        category
        link
        image
        distance
      }
    }
  }
`;

export const QUERY_SLATE = gql`
  query slate {
    slate {
      _id
      name
      restaurants {
        restaurantId
        name
        category
        link
        image
        distance
      }
    }
  }
`;
