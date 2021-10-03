import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      avatar
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
      avatar
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
      avatar
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

export const QUERY_USER_BY_EMAIL = gql`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      _id
      username
      email
      slates{
        _id
        name
        avatar
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
      avatar
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
      slateCreator
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
  query slate($id: ID!) {
    slate(id: $id) {
      _id
      name
      slateCreator
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

export const QUERY_MY_SLATES = gql`
  query mySlates($slateCreator: String!) {
    mySlates(slateCreator: $slateCreator) {
      _id
      name
      slateCreator
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

export const QUERY_RANDOM_SLATE = gql`
  query randomSlate {
    randomSlate {
      _id
      name
      slateCreator
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

export const QUERY_MY_RANDOM_RESTAURANT = gql`
  query myRandomRestaurant {
    myRandomRestaurant {
        restaurantId
        name
        category
        link
        image
        distance
    }
  }
`;

export const QUERY_SUGGESTIONS = gql`
  query suggestions($category: String!) {
    suggestions(category: $category) {
        restaurantId
        name
        category
        link
        image
        distance
    }
  }
`;