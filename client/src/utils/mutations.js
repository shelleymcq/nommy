import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
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
  mutation addUser($username: String!, $email: String!, $password: String!, $avatar: String!) {
    addUser(username: $username, email: $email, password: $password, avatar: $avatar) {
      token
      user {
        _id
        username
        avatar
      }
    }
  }
`;

export const ADD_SLATE = gql`
  mutation addSlate($name: String!) {
    addSlate(name: $name) {
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

export const ADD_RESTAURANT = gql`
  mutation addRestaurant($restaurantId: String!, $name: String!, $category: String, $image: String, $link: String, $distance: String, $slateId: String) {
    addRestaurant(restaurantId: $restaurantId, name: $name, category: $category, image: $image, link: $link, distance: $distance, slateId: $slateId) {
      _id
      name
      restaurants {
        restaurantId
        name
        category
        image
        link
        distance
      }
    }
  }
`;

export const REMOVE_RESTAURANT = gql`
  mutation removeRestaurant($restaurantId: String!, $slateId: String) {
    removeRestaurant(restaurantId: $restaurantId, slateId: $slateId) {
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
  }
`;

export const REMOVE_SLATE = gql`
  mutation removeSlate($_id: String!) {
    removeSlate(_id: $_id) {
      # username
      # email
      # slates{
      #   _id
      #   name
      #   restaurants{
      #     restaurantId
      #     name
      #     category
      #     link
      #     image
      #     distance
      #   }
      # }
      name
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($_id: String!) {
    addFriend(_id: $_id) {
      _id
      username
      avatar
      slates{
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
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($_id: String!) {
    removeFriend(_id: $_id) {
      _id
      username
      avatar
      slates{
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
      friends {
        _id
        username
      }
    }
  }
`;

export const EDIT_SLATE = gql`
  mutation editSlate($_id: String!, $name: String!) {
    editSlate(_id: $_id, name: $name) {
      name
      slateCreator
      restaurants{
        name
        category
        link
        image
        distance
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
