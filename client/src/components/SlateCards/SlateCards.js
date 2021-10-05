import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import Auth from '../../utils/auth'
import './SlateCards.css'

const SlateCards = ({slates, restaurants}) => {
    // console.log("slate cards restaurant props:", restaurants)
    // console.log("slates' names:", slates)
    const history = useHistory();
    
    const redirect = (idPath) => {
        history.push(`/slates/${idPath}`)
    }

    const handleSlateClick = (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        redirect(id)
    }

    return (

        <>
        <Container className="profile-slates-container">
                {/* MAP OVER ALL OF SLATE'S RESTAURANTS AND CREATE A CARD FOR EACH*/}
                {slates.map((slate, index) => {
                    return(
                        <Card 
                            key={slate._id}
                            data-id={slate._id} 
                            border='dark'
                            className="slate-card"
                            onClick={(event)=>handleSlateClick(event)}
                        >   
                            {restaurants[index] ? (
                                <Card.Img 
                                    src={restaurants[index].image}
                                    alt={`Highlight for ${restaurants[index].name}`}
                                    width="300px"
                                />
                            ) : 
                                <Card.Img 
                                    src="https://p0.piqsels.com/preview/253/131/676/celebrate-celebration-cheers-dining-thumbnail.jpg"
                                    alt={`Generic restaurant image`}
                                    width="300px"
                                />
                            }
                            <Card.Body>
                                <Card.Title>{slate.name}</Card.Title>
                                {Auth.getProfile().data.username !== slate.slateCreator ?
                                    <p className='small'>{slate.slateCreator}</p>
                                    :
                                    null
                                }
                                {Auth.loggedIn() && Auth.getProfile().data.username !== slate.slateCreator ?
                                    <Button
                                        className='btn-block btn-danger'
                                        // onClick={() => handleSaveBook(book.bookId)}
                                    >
                                        &#10084;
                                    </Button>
                                    :
                                    null
                                }
                            </Card.Body>
                        </Card>
                    )
                })}
        </Container>
        </>
    )
};

export default SlateCards;