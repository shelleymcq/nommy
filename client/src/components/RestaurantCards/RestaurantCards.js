import React, { useState } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import Auth from '../../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useMutation } from '@apollo/client';
import { ADD_RESTAURANT } from '../../utils/mutations';
import './RestaurantCards.css'

const RestaurantCards = ({restaurants}) => {
    // console.log("props:", restaurants)
    const [showModal, setShowModal] = useState(false);
    const [restaurantToSave, setRestaurantToSave] = useState({});
    const [newSlateName, setNewSlateName] = useState('');

    // const { loading, data } = useQuery(QUERY_ME)
    const [addRestaurant] = useMutation(ADD_RESTAURANT);

    const renderSavingOptions = (event) => {
        const restaurantData = {
            restaurantId: event.target.getAttribute('data-id'),
            name: event.target.getAttribute('data-name'),
            category: event.target.getAttribute('data-category'),
            link: event.target.getAttribute('data-link'),
            image: event.target.getAttribute('data-image'),
            distance: event.target.getAttribute('data-distance')
        }
        // console.log(restaurantData)
        setShowModal(true);
        setRestaurantToSave(restaurantData);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const handleChange = (event) => {
        const { value } = event.target;

        setNewSlateName(value);
    }

    const handleSubmit = (event) => {
        
        event.preventDefault();
        try {
            addRestaurant({
                variables: { ...restaurantToSave, slateId: newSlateName}
            });
        } catch (e) {
            console.error(e);
        }
        console.log("new slate name:", newSlateName)
        console.log("target:", event.currentTarget)
        setShowModal(false)
        setRestaurantToSave({})
        setNewSlateName('')
    }
    console.log("showModal:", showModal)
    console.log("restaurant to save:", restaurantToSave)
    console.log("restaurants:", restaurants)

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
                                // <a 
                                //     href={restaurant.link}
                                //     target="_blank"
                                //     rel="noopener noreferrer"
                                // >
                                    <Card.Img 
                                        src={restaurant.image}
                                        alt={`Highlight for ${restaurant.name}`}
                                    />
                                // </a>
                            ) : null}
                            <Card.Body>
                                <Card.Title><a href={restaurant.link} target="_blank" rel="noopener noreferrer">{restaurant.name}</a></Card.Title>
                                <p className='small'>Distance: {restaurant.distance} miles</p>

                                {Auth.loggedIn() && (
                                    <Button
                                        className='btn-block btn-danger'
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
                // <p>modal to show</p>
                <Modal show={showModal} onHide={() => handleClose()}>
                    <Modal.Header closeButton>
                    <Modal.Title>Slate to add restaurant to:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    Date night
                        <Form.Group >
                            <Form.Label>Slate name: </Form.Label>
                            <Form.Control type="text" onChange={(event)=>handleChange(event)} value={newSlateName} placeholder="name input"/>           
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={(event) => handleSubmit(event)}>
                        Submit 
                    </Button>
                    </Modal.Footer>
                </Modal>
                : null}
        </Container>
        </>
    )
};

export default RestaurantCards;