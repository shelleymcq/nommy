// BRING IN REACT, USESTATE MODULES
import React, { useState } from 'react';
// BRING IN QUERIES AND MUTATIONS
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MY_RANDOM_RESTAURANT } from '../../utils/queries';
import { API_SEARCH } from '../../utils/mutations';
// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../../utils/auth';
// BRING IN REACT COMPONENTS FOR RENDERING PAGE
import RestaurantCards from '../RestaurantCards/RestaurantCards'
// CUSTOM STYLESHEET
import './LoggedInHome.css';

const LoggedInHome = (props) => {
  // QUERY DB FOR A RANDOM RESTAURANT THE LOGGED IN USER SAVED
  const { loading, data } = useQuery(QUERY_MY_RANDOM_RESTAURANT);
  const myRestaurant = data?.myRandomRestaurant || [];
  // STATE TO HOLD RESTAURANT SUGGESTION DATA
  const [mySuggestions, setMySuggestions] = useState([])
  // USE MUTATION TO DO YELP FUSION API SEARCH
  const [apiSearch] = useMutation(API_SEARCH);

  window.onload = async () => {
    // AXIOS GET REQUEST TO YELP FUSION API
    // USING THE CATEGORY OF THE RANDOMLY SELECTED SAVED RESTAURANT
    // IF USER DOESN'T HAVE A RESTAURANT, USE 'TRENDING' TO SEARCH
    // USE USER'S ZIPCODE FOR LOCATION OF SEARCH
    await apiSearch({
      variables: { 
        searchInput: myRestaurant.category || "trending", 
        zipcode: Auth.getProfile().data.zipcode
      }
    }).then((apiResponse) =>
      // UPDATE STATE WITH API RESPONSE DATA
      setMySuggestions(apiResponse.data.apiSearch)
    )
  }
 
  if (loading) {
    <>
        <h1>Loading restaurant data...</h1>
    </>
  }
 
  return (
    <main>
      <div>
        {myRestaurant ?
          <>
            <div className="header">
              <h2 className="center">
                {/* HEADING FOR EITHER TRENDING RESTAURANTS OR BASED ON RANDOM SAVED RESTAURANT */}
                {myRestaurant.name ? 
                  `Because you liked ${myRestaurant.name}, check out these restaurants.` 
                : 
                  `Check out these trending restaurants.`
                }
              </h2>
            </div>
            {/* RENDER A CARD FOR EACH RETURNED SUGGESTED RESTAURANT */}
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
