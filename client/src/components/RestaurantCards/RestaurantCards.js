import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';

const RestaurantCard = ({restaurants}) => {
    // console.log("props:", restaurants)
    return (
        <>
        <Container>
            {/* <CardColumns> */}
                {/* MAP OVER ALL OF SLATE'S RESTAURANTS AND CREATE A CARD FOR EACH*/}
                {restaurants.map((restaurant) => {
                    return(
                        <Card 
                            key={restaurant.restaurantId} 
                            data-category={restaurant.category} 
                            border='dark'
                            className="restaurant-card"
                        >   
                            {restaurant.image ? (
                                <a 
                                    href={restaurant.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Card.Img 
                                        src={restaurant.image}
                                        alt={`Highlight for ${restaurant.name}`}
                                        // variant='top'
                                        width="300px"
                                    />
                                </a>
                            ) : null}
                            <Card.Body>
                                <Card.Title><a href={restaurant.link} target="_blank" rel="noopener noreferrer">{restaurant.name}</a></Card.Title>
                                <p className='small'>Distance: {restaurant.distance} miles</p>

                                {/* {Auth.loggedIn() && ( */}
                                    <Button
                                        className='btn-block btn-danger'
                                        // onClick={() => handleSaveBook(book.bookId)}
                                    >
                                        &#10084;
                                    </Button>
                                {/* )} */}
                            </Card.Body>
                        </Card>
                    )
                })}
            {/* </CardColumns> */}
        </Container>
        </>
    )
};

export default RestaurantCard;