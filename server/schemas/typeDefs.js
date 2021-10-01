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
    category: [String]
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
    me: User
    slates: [Slate]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    
    addSlate(name: String!): User
    addRestaurant(restaurantId: String!, category: String, name: String!, image: String, distance: String, link: String): Slate
  }
`;

module.exports = typeDefs;
