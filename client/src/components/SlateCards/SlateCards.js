import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
// import { QUERY_SLATE } from '../../utils/queries';
import { useHistory } from 'react-router-dom'
import SlateById from '../SlateById/SlateById'

const SlateCards = ({slates}) => {
    console.log("props:", slates)
    const [slateId, setSlateId] = useState('');

    const history = useHistory();

    const redirect = (idPath) => {
        history.push(`/slates/${idPath}`)
    }

    const handleSlateClick = (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        // console.log("clicked slate's id:", id)

        setSlateId(id);

        redirect(id)
    }

    return (
       
        <>
        <Container>
            <div>{slateId}</div>
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