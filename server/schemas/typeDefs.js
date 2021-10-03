const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
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
    restaurantId: String!
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
    randomSlate: Slate
    myRandomRestaurant: Restaurant
    suggestions(category: String!): [Restaurant]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    
    addSlate(name: String!): User
    addRestaurant(restaurantId: String!, category: String, name: String!, image: String, distance: String, link: String, slateId: String): Slate
    addFriend(_id: String!): User

    removeRestaurant(restaurantId: String!, slateId: String): Slate
    removeSlate(_id: String!): User
    removeFriend(_id: String!): User
  }
`;

module.exports = typeDefs;
