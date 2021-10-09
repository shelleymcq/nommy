// BRING IN REACT, REACT-BOOTSTRAP, AND REACT-ROUTER-DOM MODULES
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../../utils/auth'
// CUSTOM STYLESHEET
import './SlateCards.css'

const SlateCards = ({slates, restaurants}) => {
    // ENABLE USE HISTORY
    const history = useHistory();
    // HELPER TO ROUTE TO SLATE BY ID PATH
    const redirect = (idPath) => {
        history.push(`/slates/${idPath}`)
    }
    // WHEN USER CLICKS ON A SLATE, REDIRECT TO SLATE PAGE
    const handleSlateClick = (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        redirect(id)
    }

    return (
        <>
        <Container className="profile-slates-container">
            {/* MAP OVER ALL OF SLATE'S RESTAURANTS AND CREATE A CARD FOR EACH*/}
            {/* USE SLATE INDEX TO ALIGN SLATE'S LAST SAVED RESTAURANT'S IMAGE TO COVER PICTURE */}
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
                            <Card.Title className="slateName">
                                {slate.name}
                            </Card.Title>

                            {/* ONLY SHOW SLATE CREATOR'S NAME, IF NOT THE LOGGED IN USER'S SLATE */}
                            {Auth.getProfile().data.username !== slate.slateCreator ?
                                <p className='small'>{slate.slateCreator}</p>
                            :
                                null
                            }
                            
                            {/* ONLY SHOW 'HEART' BUTTON ON SLATE IF NOT MINE */}
                            {/* FUTURE FUNCTIONALITY TO 'FOLLOW' OTHER'S SLATES */}
                            {/* {Auth.getProfile().data.username !== slate.slateCreator ?
                                <Button
                                    className='btn-block btn-danger'
                                >
                                    <i className="fas fa-heart"></i>
                                </Button>
                                :
                                    null
                            } */}
                        </Card.Body>
                    </Card>
                )
            })}
        </Container>
        </>
    )
};

export default SlateCards;