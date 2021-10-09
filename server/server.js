// BRING IN MODULES FOR EXPRESS, APOLLO SERVER, DOTENV, AND PATH
require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// BRING IN TYPEDEFS, RESOLVERS, AND AUTHORIZATION MIDDELWARE UTILITY/ 
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

// DATABASE CONNECTION
const db = require('./config/connection');

// SET PORT AND INSTANCE OF EXPRESS SERVER
const PORT = process.env.PORT || 3001;
const app = express();

// CREATE NEW INSTANCE OF APOLLO SERVER PASSING IN TYPEDEFS AND RESOLVERS
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // USE CONTEXT ON SERVER SO DATA CAN BE PASSED FROM AUTHMIDDLEWARE TO RESOLVER FUNCTIONS
  context: authMiddleware,
});

// CONNECT APOLLO SERVER TO EXPRESS
server.applyMiddleware({ app });

// DATA PARSING & ABILITY TO USE JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SERVE UP STATIC ASSETS
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// WILDCARD ROUTE TO DIRECT TO HOMEPAGE
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// START APP LISTENING
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
