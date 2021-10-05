import React, { useState } from 'react';
import {
  Jumbotron, Container, Col, Form, Button,
} from 'react-bootstrap';
import RestaurantCards from '../components/RestaurantCards/RestaurantCards'

const SearchRestaurants = () => {
  // create state for holding returned yelp api data
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create method to search for restaurants and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const access_token = "sSXKlBRl8-Udgkwovew8iS0fHqM9wWIbdRr6UHc1eC3q2ExpuS7RIbie_2jYcXbb4L_pDc-sYs1Sjv-xCdcp3NzrB60XIRiveoDTZUg5mxOznH3sKpw1JcGOQbFUYXYx";

      const location = "Atlanta";

      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurants&limit=20&location=${location}&term=${searchInput}`, {
        headers: {
          "Authorization": `Bearer ${access_token}`
        } 
      })

      if (!response.ok) {
        // throw new Error('something went wrong!');
        console.log("something went wrong!")
      }

      const { businesses } = await response.json();
      console.log("json response:", businesses[0])
      console.log("json response:", businesses[0].categories[0].title)

      const restaurantData = businesses.map((restaurant) => ({
        restaurantId: restaurant.id,
        name: restaurant.name,
        link: restaurant.url,
        image: restaurant.image_url || '',
        distance: (restaurant.distance* 0.000621).toFixed(2)
      }));

      setSearchedRestaurants(restaurantData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>this is the search results page</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for restaurants"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
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
