import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';

const SlateCards = ({slates}) => {
    console.log("props:", slates)
    return (
       
        <>
        <Container>
            {/* <CardColumns> */}
                {/* MAP OVER ALL OF SLATE'S RESTAURANTS AND CREATE A CARD FOR EACH*/}
                {slates.map((slate) => {
                    return(
                        <Card 
                            key={slate._id} 
                            border='dark'
                            className="slate-card"
                        >   
                            {/* {restaurant.image ? (
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
                            ) : null} */}
                            <Card.Body>
                                <Card.Title><a href="#" target="_blank" rel="noopener noreferrer">{slate.name}</a></Card.Title>
                                <p className='small'>{slate.slateCreator}</p>

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

export default SlateCards;