import React, { useState } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import Auth from '../../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { useMutation } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_RESTAURANT } from '../../utils/mutations';

// Utilities
import { QUERY_MY_SLATES, QUERY_ME } from '../../utils/queries';

import './RestaurantCards.css';
import Nommy from '../../assets/img/nommy.jpg';

const RestaurantCards = ({restaurants}) => {
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [restaurantToSave, setRestaurantToSave] = useState({});
    const [newSlateId, setNewSlateId] = useState('');
    const [newSlateName, setNewSlateName] = useState('');

    const { loading, data } = useQuery(QUERY_ME)
    const myUserData = data?.me || {};

    const [addRestaurant] = useMutation(ADD_RESTAURANT);

    const slatesRes = useQuery(QUERY_MY_SLATES, { variables: { slateCreator: myUserData.username }});

    const allMySlates = slatesRes.data?.mySlates || [];

    const renderSavingOptions = (event) => {
        const restaurantData = {
            restaurantId: event.target.getAttribute('data-id'),
            name: event.target.getAttribute('data-name'),
            category: event.target.getAttribute('data-category'),
            link: event.target.getAttribute('data-link'),
            image: event.target.getAttribute('data-image'),
            distance: event.target.getAttribute('data-distance')
        }
        setShowModal(true);
        setRestaurantToSave(restaurantData);
    }

    const handleClose = () => {
        setShowModal(false);

    }

    const handleCloseSuccessMessage = () => {
        setRestaurantToSave({})
        setNewSlateId('')
        setNewSlateName('')
        setShowSuccessModal(false);
    }

    const handleChange = (event) => {
        const { value } = event.target;
        const slateName = event.target.selectedOptions[0].innerText
        
        setNewSlateId(value);
        setNewSlateName(slateName)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        try {
            // const selectedSlate = allMySlates.filter(slate => slate._id === newSlateId)
            // console.log(selectedSlate.restaurants)
            addRestaurant({
                variables: { ...restaurantToSave, slateId: newSlateId}
            });
            setShowSuccessModal(true)
        } catch (e) {
            console.error(e);
        }
        
        setShowModal(false)
    }

    if (loading ) {
        return <h4>Loading...</h4>;
    }

    return (
        <>
        <Container className="restaurant-card-container">
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
                                        className="card-image"
                                        variant="top" 
                                        src={restaurant.image}
                                        alt={`Highlight for ${restaurant.name}`}
                                    />
                                </a>
                            ) : 
                                <a 
                                    href={restaurant.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Card.Img 
                                        className="card-image"
                                        variant="top" 
                                        src={Nommy}
                                        alt={`no image available for this restaurant`}
                                    />
                                </a>
                            }
                            <Card.Body>
                                <Card.Title><a className="restaurant-link" href={restaurant.link} target="_blank" rel="noopener noreferrer">{restaurant.name}</a></Card.Title>
                                <p className='small-text'>Distance: {restaurant.distance} miles</p>

                                {Auth.loggedIn() && (
                                    <Button
                                        className='btn-block btn-danger outline-delete'
                                        data-id={restaurant.restaurantId}
                                        data-name={restaurant.name}
                                        data-category={restaurant.category}
                                        data-image={restaurant.image}
                                        data-link={restaurant.link}
                                        data-distance={restaurant.distance}
                                        onClick={(event) => renderSavingOptions(event)}
                                    >
                                        &#10084;
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    )
                })}
            {showModal ? 
                <Modal show={showModal} onHide={() => handleClose()}>
                    <Modal.Header closeButton>
                    <Modal.Title>Would you like to save this restaurant?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="slate-select-div">
                            <Form.Control
                                as="select"
                                custom
                                onChange={(event)=>handleChange(event)}
                            >
                                <option>Select a slate:</option>
                                {allMySlates.map((each)=>{
                                    return(
                                        <option key={each._id} value={each._id}>{each.name}</option>
                                    )
                                })}
                            </Form.Control>
                        </div>
                        {/* {showDuplicateSlateMsg ?
                        <p className="warning-message">You're loving {restaurantToSave.name}! It's already in {newSlateName}! Add to a different slate?</p>
                        : null
                        } */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary outline-delete" onClick={(event) => handleSubmit(event)}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                : null}
                {showSuccessModal ? 
                <Modal show={showSuccessModal} onHide={() => handleCloseSuccessMessage()}>
                    <Modal.Header closeButton onClick={() => handleCloseSuccessMessage()}>
                    <Modal.Title>Now we're cookin'!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="modalText">{restaurantToSave.name} was added to your {newSlateName} slate!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary outline-delete" onClick={() => handleCloseSuccessMessage()}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                : null}
        </Container>
        </>
    )
};

export default RestaurantCards;