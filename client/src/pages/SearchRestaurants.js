import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from 'react-bootstrap';

// import { useMutation } from '@apollo/client';
// import { SAVE_BOOK } from '../utils/mutations';
// import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

import Auth from '../utils/auth';

const SearchRestaurants = () => {
  // create state for holding returned yelp api data
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  // const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // const [saveBook, { error }] = useMutation(SAVE_BOOK);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  // useEffect(() => {
  //   return () => saveBookIds(savedBookIds);
  // });

  // create method to search for restaurants and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const access_token = "sSXKlBRl8-Udgkwovew8iS0fHqM9wWIbdRr6UHc1eC3q2ExpuS7RIbie_2jYcXbb4L_pDc-sYs1Sjv-xCdcp3NzrB60XIRiveoDTZUg5mxOznH3sKpw1JcGOQbFUYXYx";

      const location = "Atlanta";

      // const searchTerm = "pizza"

      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurants&limit=50&location=${location}&term=${searchInput}`, {
        headers: {
          "Authorization": `Bearer ${access_token}`
        } 
      })//**.then((res) => {
        // console.log(res)
        // return res.json();
      // }).then((json) => {
        // console.log(json);
      // }).catch((err) => console.log(err))
      // const response = await fetch(
      //   `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      // );

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

  // create function to handle saving a book to our database
  // const handleSaveBook = async (bookId) => {
  //   // find the book in `searchedBooks` state by the matching id
  //   const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

  //   // get token
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const { data } = await saveBook({
  //       variables: { bookData: { ...bookToSave } },
  //     });
  //     console.log(savedBookIds);
  //     setSavedBookIds([...savedBookIds, bookToSave.bookId]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
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
        <CardColumns>
          {searchedRestaurants.map((restaurant) => {
            return (
              <Card key={restaurant.restaurantId} border="dark">
                {restaurant.image ? (
                  <Card.Img
                    src={restaurant.image}
                    width="200px"
                    height="200px"
                    alt={`A picture for ${restaurant.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                  <p className="small">Distance: {restaurant.distance} miles</p>
                  {/* <Card.Text>{book.description}</Card.Text> */}
                  {/* {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some(
                        (savedId) => savedId === book.bookId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      {savedBookIds?.some((savedId) => savedId === book.bookId)
                        ? 'Book Already Saved!'
                        : 'Save This Book!'}
                    </Button>
                  )} */}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchRestaurants;
