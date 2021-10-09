// BRING IN REACT, USESTATE, REACT-BOOTSTRAP MODULES
import React, { useState } from 'react';
import {
  Jumbotron, Container, Form, Button,
} from 'react-bootstrap';
// BRING IN MUTATION FOR API SEARCH OF YELP FUSION API
import { useMutation } from '@apollo/client';
import { API_SEARCH } from '../utils/mutations'
// BRING IN RESTAURANTCARDS COMPONENT
import RestaurantCards from '../components/RestaurantCards/RestaurantCards'
// CUSTOM STYLESHEET
import './SearchRestaurants.css'
// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../utils/auth'

// SEARCH RESTAURANTS PAGE
const SearchRestaurants = () => {
  // SET STATE FOR FETCHED API DATA
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  // STATE FOR WHETHER TO SHOW WHITE OPAQUE BACKGROUND
  const [showBackground, setShowBackground] = useState(false);
  // STATE TO HOLD THE USER'S SEARCH INPUT FOR API QUERY
  const [searchInput, setSearchInput] = useState('');
  // USE MUTATION HOOK FOR DOING A YELP FUSION API SEARCH
  const [apiSearch] = useMutation(API_SEARCH);

  // HANDLE WHEN USER SUBMITS A SEARCH TERM(S)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // MUST HAVE AN INPUT
    if (!searchInput) {
      return false;
    }

    // FETCH YELP FUSION API DATA GIVEN USER'S SEARCH INPUT AND THEIR ZIPCODE
    try {
      const apiResponse = await apiSearch({
        variables: { 
          searchInput: searchInput, 
          zipcode: Auth.getProfile().data.zipcode
        }
    });

    // VARIABLE FOR RESTAURANT DATA RETURNED FROM API SEARCH REQUEST
      const returnedRestaurants = apiResponse.data.apiSearch
      
      // SET STATE TO RETURN API RESTAURANT DATA
      setSearchedRestaurants(returnedRestaurants);
      // SHOW THE OPAQUE BACKGROUND FOR RENDING RESULTS AGAINST
      setShowBackground(true)
      // CLEAR SEARCH INPUT STATE
      setSearchInput('');
    } catch(err) {
      console.error(err);
      
    }
  };
  
  // MUST BE LOGGED IN TO VIEW PAGE
  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  // SEARCH PAGE
  return (
    <>
    <Jumbotron fluid className="search">
      <Container>
        <div className='searchTitle'>
        <h1>Hungry? Get Inspired!</h1>
        </div>

        {/* SEARCH FORM */}
        <Form onSubmit={(event)=> handleFormSubmit(event)}>
          <Form.Control
            name="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            size="lg"
            placeholder="Search for restaurants"
          />
          <Button 
            className='btn-primary outline-delete m-4'
            type="submit"
            variant="success"
            size="lg"
          >
            Submit Search
          </Button>
        </Form>
      </Container>
    </Jumbotron>

    {/* CONTAINER TO RENDER SEARCH RESULTS */}
    <Container 
      className={showBackground ? "restaurant" : "container"}>
      <h2>
        {searchedRestaurants.length
          ? `Viewing ${searchedRestaurants.length} results:`
          : null}
      </h2>
      {/* RENDER THE RESTAURANTCARDS COMPONENT WITH RESTAURANT DATA */}
      <div>
        {searchedRestaurants ? 
          <div>
            <RestaurantCards restaurants={searchedRestaurants} />
          </div>
        : 
          null
        }
      </div>
    </Container>
    </>
  );
};

export default SearchRestaurants;
