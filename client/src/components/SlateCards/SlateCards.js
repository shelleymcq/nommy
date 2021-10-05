import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

const SlateCards = ({slates}) => {
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
        <Container>
            {/* <div>{Auth.getProfile().data.username}</div> */}
            {/* <CardColumns> */}
                {/* MAP OVER ALL OF SLATE'S RESTAURANTS AND CREATE A CARD FOR EACH*/}
                {slates.map((slate) => {
                    return(
                        <Card 
                            key={slate._id}
                            data-id={slate._id} 
                            border='dark'
                            className="slate-card"
                            onClick={(event)=>handleSlateClick(event)}
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
                                <Card.Title>{slate.name}</Card.Title>
                                <p className='small'>{slate.slateCreator}</p>

                                {/* {Auth.loggedIn() && ( */}
                                    <Button
                                        className='btn-block btn-danger'
                                        // onClick={() => handleSaveBook(book.bookId)}
                                    >
                                        &#10084;
                                    </Button>
                                {/* )} */}
                                {/* {Auth.getProfile().data.username === slate.slateCreator ? 
                                    <Button
                                        className='btn-block btn-danger'
                                        onClick={() => handleDeleteSlate(slate._id)}
                                    >
                                        <i class="fas fa-trash"></i>
                                    </Button>
                                    :
                                    null
                                } */}
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