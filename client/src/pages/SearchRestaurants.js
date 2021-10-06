import React, { useState } from 'react';
import {
  Jumbotron, Container, Col, Form, Button,
} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { API_SEARCH } from '../utils/mutations'
import RestaurantCards from '../components/RestaurantCards/RestaurantCards'
import './SearchRestaurants.css'

const SearchRestaurants = () => {
  // create state for holding returned yelp api data
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  const [apiSearch] = useMutation(API_SEARCH);

  // create method to search for restaurants and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target)
    console.log("search input:" ,searchInput)

    if (!searchInput) {
      return false;
    }

    try {
      const apiResponse = await apiSearch({
        variables: { searchInput: searchInput }
    });
       const returnedRestaurants = apiResponse.data.apiSearch

      setSearchedRestaurants(returnedRestaurants);
      
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* <Jumbotron fluid className="text-light bg-dark"> */}
      <Jumbotron fluid className="search">
        <Container>
          <h1>This is the search results page</h1>
          <Form onSubmit={(event)=> handleFormSubmit(event)}>
            <Form.Row>
              {/* <Col xs={12} md={8}> */}
              <Col >
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for restaurants"
                />
              </Col>
              <Col>
              {/* <Col xs={12} md={4}> */}
                <Button className='btn-search' type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedRestaurants.length
            ? `Viewing ${searchedRestaurants.length} results:`
            : 'Search for restaurants to begin'}
        </h2>
        <div>{searchedRestaurants ? 
          <div>
            <RestaurantCards restaurants={searchedRestaurants} />
          </div>
        : null}</div>
      </Container>
    </>
  );
};

export default SearchRestaurants;
