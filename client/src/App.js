// BRING IN REACT, APOLLO, AND REACT-ROUTER-DOM MODULES
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {BrowserRouter as Router, Route } from 'react-router-dom';

// BRING IN PAGES AND COMPONENTS FOR RENDERING
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import FriendPage from './pages/FriendPage';
import SearchRestaurants from './pages/SearchRestaurants';
import SlateById from './components/SlateById/SlateById';

// CONSTRUCT OUR MAIN GRAPHQL API ENDPOINT
const httpLink = new HttpLink({
  uri: window.__RUNTIME_CONFIG__.API_URL + '/graphql',
});

// CONSTRUCT REQUEST MIDDLEWARE THAT WILL ATTACH THE JWT TOKEN
// TO EVERY REQUEST AS AN 'AUTHORIZATION' HEADER
const authLink = setContext((_, { headers }) => {
  // GET AUTHENTICATION TOKEN FROM LOCAL STORAGE IF IT EXISTS
  const token = localStorage.getItem('id_token');
  // RETURN THE HEADERS TO CONTEXT SO HTTPLINK CAN READ THEM
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// CREATE NEW INSTANCE OF APOLLO CLIENT
const client = new ApolloClient({
  // SET UP OUR CLIENT TO EXECUTE THE 'AUTHLINK' MIDDLEWARE
  // PRIOR TO MAKING THE REQUEST TO OUR GRAPHQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// REACT APP WITH ROUTES FOR URL PATHS
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/friends">
              <FriendPage />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route path="/profile/:id">
              <Profile />
            </Route>
            <Route exact path="/search">
              <SearchRestaurants />
            </Route>
            <Route path="/slates/:id">
              <SlateById />
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
