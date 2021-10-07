// Node Modules
import React from 'react';
import { useQuery } from '@apollo/client';
// Utilities
import { QUERY_MY_RANDOM_RESTAURANT, QUERY_SUGGESTIONS } from '../../utils/queries';
// Components
import RestaurantCards from '../RestaurantCards/RestaurantCards'
// Styling
import './LoggedInHome.css';

const LoggedInHome = (props) => {
  const { loading, data } = useQuery(QUERY_MY_RANDOM_RESTAURANT);
  const myRestaurant = data?.myRandomRestaurant || [];
  console.log("myRestaurant:", myRestaurant.category)
  const suggestionsResponse = useQuery(QUERY_SUGGESTIONS, { variables: { category: myRestaurant ? myRestaurant.category : "Mexican"}});
  const mySuggestions = suggestionsResponse.data?.suggestions || [];
  console.log("suggested restaurants:", mySuggestions)
 
  if (loading) {
    <>
        <h1>Loading...</h1>
    </>
  }
 
  return (
    <main>
      <div>{myRestaurant ?
          <>
          <div className="header">
            <h2 className="center">Because you liked {myRestaurant.name}, check out these restaurants.</h2>
          </div>
          <RestaurantCards restaurants={mySuggestions} />
          </>
          : 
          <div className="header">
            <h2 className="center">You don't have any saved restaurants yet.</h2>
            <h4 className="center">Start your search by adding a new slate to your profile.</h4>
          </div>
          }
      </div>
    </main>
  );
};

export default LoggedInHome;
