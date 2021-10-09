import React, { useState } from 'react';
import {
  Jumbotron, Container, Col, Form, Button,
} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { API_SEARCH } from '../utils/mutations'
import RestaurantCards from '../components/RestaurantCards/RestaurantCards'
import './SearchRestaurants.css'
import Auth from '../utils/auth'

const SearchRestaurants = () => {
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  const [showBackground, setShowBackground] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [apiSearch] = useMutation(API_SEARCH);


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const apiResponse = await apiSearch({
        variables: { 
          searchInput: searchInput, 
          zipcode: Auth.getProfile().data.zipcode
        }
    });
       const returnedRestaurants = apiResponse.data.apiSearch

      setSearchedRestaurants(returnedRestaurants);
      setShowBackground(true)
      setSearchInput('');
    } catch(err) {
      console.error(err);
    }
  };

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <>
      <Jumbotron fluid className="search">
        <Container>
          <div className='searchTitle'>
          <h1>Hungry? Get Inspired!</h1>
          </div>

          <Form onSubmit={(event)=> handleFormSubmit(event)}>
            <Form.Row>
              <Col className='searchCol'> 
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for restaurants"
                />
              </Col>
            </Form.Row>
          </Form>
          <Col>
                <Button className='btn-primary outline-delete m-4' type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
        </Container>
      </Jumbotron>

      <Container className={showBackground ? "restaurant" : "container"}>
        <h2>
          {searchedRestaurants.length
            ? `Viewing ${searchedRestaurants.length} results:`
            : null}
        </h2>
        <div >{searchedRestaurants ? 
          <div>
            <RestaurantCards restaurants={searchedRestaurants} />
          </div>
        : null}</div>
      </Container>
    </>
  );
};

export default SearchRestaurants;
