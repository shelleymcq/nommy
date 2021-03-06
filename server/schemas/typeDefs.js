// BRING IN GRAPHQL FOR APOLLO-SERVER-EXPRESS
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    avatar: String
    zipcode: String
    lastSearch: String
    friends: [User]
    slates: [Slate]
  }

  type Slate {
    _id: ID
    name: String
    restaurants: [Restaurant]
    slateCreator: String
  }

  type Restaurant {
    restaurantId: String
    category: String
    name: String!
    image: String
    distance: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    userByName(username: String!): User
    userByEmail(email: String!): User
    me: User
    slates: [Slate]
    slate(id: ID!): Slate
    mySlates(slateCreator: String!): [Slate]
    randomSlate: Slate
    myRandomRestaurant: Restaurant
    suggestions(category: String!): [Restaurant]
    slateImage(slateCreator: String!): [Restaurant]
    myFriends: [User]
    nonFriends(friendNameArray: [String!]): [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, avatar: String!, zipcode: String): Auth
    login(email: String!, password: String!): Auth
    addSlate(name: String!): User
    addRestaurant(restaurantId: String!, category: String, name: String!, image: String, distance: String, link: String, slateId: String): Slate
    addFriend(_id: String!): User
    removeRestaurant(restaurantId: String!, slateId: String): Slate
    removeSlate(_id: String!): Slate
    removeFriend(_id: String!): User
    editSlate(_id: String!, name: String!): Slate
    apiSearch(searchInput: String!, zipcode: String!): [Restaurant]
  }
`;

module.exports = typeDefs;
