// BRING IN REACT, USESTATE, REACT-BOOTSTRAP MODULES
import React, { useState } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../../utils/auth';
// STYLING
import 'bootstrap/dist/css/bootstrap.min.css'
// BRING IN QUERIES AND MUTATIONS
import { useMutation, useQuery } from '@apollo/client';
import { ADD_RESTAURANT } from '../../utils/mutations';
import { QUERY_MY_SLATES, QUERY_ME } from '../../utils/queries';
// BRING IN REACT COMPONENTS AND IMAGE FILE FOR RENDERING PAGE
import './RestaurantCards.css';
import Nommy from '../../assets/img/nommy.jpg';

const RestaurantCards = ({restaurants}) => {
    // STATE TO TOGGLE SHOWING/HIDING MODAL FOR SAVING A RESTAURANT
    const [showModal, setShowModal] = useState(false);
    // STATE TO TOGGLE SHOWING/HIDING SUCCESS MSG AFTER RESTAURANT SAVED
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    // STATE TO HOLD RESTAURANT DATA TO SAVE
    const [restaurantToSave, setRestaurantToSave] = useState({});
    // STATES TO HOLD SELECTED STATE ID AND NAME IN WHICH TO SAVE RESTAURANT
    const [newSlateId, setNewSlateId] = useState('');
    const [newSlateName, setNewSlateName] = useState('');

    // QUERY DB FOR LOGGED IN USER'S DATA & GET DATA
    const { loading, data } = useQuery(QUERY_ME)
    const myUserData = data?.me || {};

    // USE MUTATION TO ADD A RESTAURANT TO THE LOGGED IN USER'S SLATE OF CHOICE
    const [addRestaurant] = useMutation(ADD_RESTAURANT);

    // QUERY DB FOR ALL OF LOGGED IN USER'S SLATES & GET DATA
    const slatesRes = useQuery(QUERY_MY_SLATES, { variables: { slateCreator: myUserData.username }});
    const allMySlates = slatesRes.data?.mySlates || [];

    // HELPER TO SHOW 'ADD RESTAURANT' MODAL WHEN HEART CLICKED
    const renderSavingOptions = (event) => {
        // GRAB THE CLICKED RESTAURANT'S DATA
        const restaurantData = {
            restaurantId: event.target.getAttribute('data-id'),
            name: event.target.getAttribute('data-name'),
            category: event.target.getAttribute('data-category'),
            link: event.target.getAttribute('data-link'),
            image: event.target.getAttribute('data-image'),
            distance: event.target.getAttribute('data-distance')
        }
        // SHOW THE ADD RESTAURANT MODAL
        setShowModal(true);
        // UPDATE STATE WITH RESTAURANT DATA
        setRestaurantToSave(restaurantData);
    }

    // HELPER TO HIDE 'ADD RESTAURANT' MODAL
    const handleClose = () => {
        setShowModal(false);

    }

    // HELPER AFTER RESTAURANT IS SAVED TO SLATE
    const handleCloseSuccessMessage = () => {
        // CLEAR STATES
        setRestaurantToSave({})
        setNewSlateId('')
        setNewSlateName('')
        // HIDE SUCCESS MESSAGE MODAL
        setShowSuccessModal(false);
    }

    // UPDATE STATES AS USER CHANGES 'ADD RESTAURANT' MODAL FORM
    const handleChange = (event) => {
        // GRAB SLATE ID AND NAME SELECTED
        const { value } = event.target;
        const slateName = event.target.selectedOptions[0].innerText
        
        // UPDATE STATES
        setNewSlateId(value);
        setNewSlateName(slateName)
    }

    // HANDLE SUBMISSION OF 'ADD RESTAURANT' MODAL
    const handleSubmit = (event) => {
        event.preventDefault();
        
        // ADD RESTAURANT TO USER'S SLATE
        // GIVEN THE RESTAURANT DATA & SLATE ID
        try {
            addRestaurant({
                variables: { ...restaurantToSave, slateId: newSlateId}
            });

            // SHOW SUCCESS MESSAGE MODAL
            setShowSuccessModal(true)
        } catch (e) {
            console.error(e);
        }
        
        // HIDE 'ADD RESTAURANT' MODAL
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
                        {/* USE RESTAURANT IMAGE, CLICKABLE TO URL */}
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
                            // OR NOMMY LOGO IF NO IMAGE
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
                            <Card.Title>
                                <a 
                                    className="restaurant-link" 
                                    href={restaurant.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    {restaurant.name}
                                </a>
                            </Card.Title>

                            <p className='small-text'>
                                Distance: {restaurant.distance} miles
                            </p>

                            {/*IF LOGGED IN, SHOW "HEART" BUTTON FOR OPTION TO SAVE */}
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
                                    <i className="fas fa-heart"></i>
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                )
            })}

            {/* 'ADD RESTAURANT' MODAL */}
            {showModal ? 
                <Modal 
                    show={showModal} 
                    onHide={() => handleClose()}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Would you like to save this restaurant?
                        </Modal.Title>
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
                                        <option 
                                            key={each._id} 
                                            value={each._id}
                                        >
                                            {each.name}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button 
                            variant="primary outline-delete" 
                            onClick={(event) => handleSubmit(event)}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            : 
                null
            }

            {/* MODAL FOR SUCCESS MSG AFTER RESTAURANT ADDED TO SLATE */}
            {showSuccessModal ? 
                <Modal 
                    show={showSuccessModal} 
                    onHide={() => handleCloseSuccessMessage()}
                >
                    <Modal.Header 
                        closeButton 
                        onClick={() => handleCloseSuccessMessage()}
                    >
                        <Modal.Title>
                            Now we're cookin'!
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="modalText">
                            {restaurantToSave.name} was added to your {newSlateName} slate!
                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button 
                            variant="primary outline-delete" 
                            onClick={() => handleCloseSuccessMessage()}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            : 
                null
            }
        </Container>
        </>
    )
};

export default RestaurantCards;