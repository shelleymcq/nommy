// Node Modules
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
// Utilities
import { QUERY_MY_RANDOM_RESTAURANT } from '../../utils/queries';
import { API_SEARCH } from '../../utils/mutations';
import Auth from '../../utils/auth';
// Components
import RestaurantCards from '../RestaurantCards/RestaurantCards'
// Styling
import './LoggedInHome.css';

const LoggedInHome = (props) => {
  const { loading, data } = useQuery(QUERY_MY_RANDOM_RESTAURANT);
  const myRestaurant = data?.myRandomRestaurant || [];
  const [mySuggestions, setMySuggestions] = useState([])
  const [apiSearch] = useMutation(API_SEARCH);

  window.onload = () => {
    const apiResponse = apiSearch({
      variables: { 
        searchInput: myRestaurant.category, 
        zipcode: Auth.getProfile().data.zipcode
      }
    }).then((apiResponse) =>
      setMySuggestions(apiResponse.data.apiSearch)
    )
  }
 
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
