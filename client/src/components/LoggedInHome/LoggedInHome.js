// Node Modules
import React from 'react';
import { useQuery } from '@apollo/client';
// Utilities
import { QUERY_MY_RANDOM_RESTAURANT, QUERY_SUGGESTIONS } from '../../utils/queries';
// Components
import RestaurantCards from '../RestaurantCards/RestaurantCards'
// Styling
import './LoggedInHome.css';

const LoggedInHome = () => {
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
      <div className="slate-header">
        <h2 className="center">Because you liked: {myRestaurant.name}...</h2>
      </div>
      <div>{mySuggestions ? 
      <div>
        <RestaurantCards restaurants={mySuggestions} />
      </div>
      : null}</div>
      
    </main>
  );
};

export default LoggedInHome;
