// Node Modules
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
// Utilities
import Auth from '../utils/auth';
import { QUERY_ME, QUERY_USERS, QUERY_SLATES } from '../utils/queries';
// Components
import UserList from '../components/UserList';
import context from 'react-bootstrap/esm/AccordionContext';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import RestaurantCards from '../components/RestaurantCards/RestaurantCards'
import LoggedOutHome from '../components/LoggedOutHome/LoggedOutHome';
import LoggedInHome from '../components/LoggedInHome/LoggedInHome';

const Home = () => {

  return (
    <main>
      {Auth.loggedIn() ?
      
      <>
      <LoggedInHome />
      </>
      
      : 

      <>
      <LoggedOutHome />
      </>
      }
    </main>
  );
};

export default Home;
