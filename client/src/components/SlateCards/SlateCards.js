import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
// import { QUERY_SLATE } from '../../utils/queries';
import { REMOVE_SLATE } from '../../utils/mutations';
import { useHistory } from 'react-router-dom'
import SlateById from '../SlateById/SlateById'
import UserList from '../UserList';

const SlateCards = ({slates}) => {
    // console.log("props:", slates)

    // const [slateId, setSlateId] = useState('');
    // const [removeSlate, { error }] = useMutation(REMOVE_SLATE);

    const history = useHistory();

    const redirect = (idPath) => {
        history.push(`/slates/${idPath}`)
    }

    const handleSlateClick = (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        // console.log("clicked slate's id:", id)

        // setSlateId(id);

        redirect(id)
    }

    // const handleDeleteSlate = (slateId) => {
    //     // GRAB USER TOKEN IF USER LOGGED IN
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     // IF USER NOT LOGGED IN, DON'T CONTINUE
    //     if (!token) {
    //     return false;
    //     }

    //     // USE MUTATION TO REMOVE THE SLATE BY SLATE ID
    //     try {
    //     removeSlate({
    //         variables: { slateId }
    //     });

    //     } catch (error) {
    //     console.error(error);
    //     }
    // }

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