// Node Modules
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
// Utilities
import Auth from '../../utils/auth';
import { QUERY_SLATE } from '../../utils/queries';
import { REMOVE_SLATE, EDIT_SLATE } from '../../utils/mutations'
import { useParams, useHistory } from 'react-router-dom'
// Components
import RestaurantCards from '../RestaurantCards/RestaurantCards'
// Styling


const SlateById = () => {
    const { id } = useParams();
    // console.log('params slate id: ', id)
    const { loading, data } = useQuery(QUERY_SLATE, {
        variables: { id },
      });
    const returnedSlate = data?.slate || [];
    const restaurants = returnedSlate.restaurants;
    // console.log("restaurants:", restaurants)
    const [showSlateModal, setShowSlateModal] = useState(false);
    const [updatedName, setUpdatedName] = useState('');
    const [removeSlate] = useMutation(REMOVE_SLATE);
    const [editSlate] = useMutation(EDIT_SLATE);

    const history = useHistory();

    const redirect = () => {
        history.push(`/profile`);
        history.go(0)
    }

    const handleEditClick = (event) => {
      setShowSlateModal(true)
    }

    const handleClose = () => {
      setShowSlateModal(false);
    }

    const handleChange = (event) => {
      const { value } = event.target;

      setUpdatedName(value);
  }

    const handleEditSlate = (event) => {
      // alert(`you clicked edit slate for ${slateId}`)
      event.preventDefault()
      console.log(`you changed the name of ${id}`)
      try {
        editSlate({
            variables: { _id: id, name: updatedName }
        });

        window.location.reload();
      } catch (error) {
        console.error(error);
      }

    }

    const handleDeleteSlate = (slateId) => {
      console.log("you clicked the delete button")
      console.log('slateId to delete:', slateId)
    
      // // GRAB USER TOKEN IF USER LOGGED IN
      // const token = Auth.loggedIn() ? Auth.getToken() : null;

      // // IF USER NOT LOGGED IN, DON'T CONTINUE
      // if (!token) {
      //   return false;
      // }

      // USE MUTATION TO REMOVE THE SLATE BY SLATE ID
      try {
        removeSlate({
            variables: { _id: slateId }
        });

        redirect();
      } catch (error) {
        console.error(error);
      }
    }
  
  if (loading) {
    <>
        <h1>Loading...</h1>
    </>
  }

  return (
    <main>
      <div className="slate-header">
        <h2 className="center">{returnedSlate.name}</h2>
      </div>
      <div>
        {Auth.getProfile().data.username === returnedSlate.slateCreator ? 
          <>
          <Button
            className='btn-block btn-danger'
            onClick={() => handleDeleteSlate(returnedSlate._id)}
          >
            <i class="fas fa-trash"></i>
          </Button>
          <Button
            className='btn-block btn-danger'
            // onClick={() => handleEditSlate(returnedSlate._id)}
            onClick={(event) => handleEditClick(event)}
          >
            <i class="fas fa-pen"></i>
          </Button>
          </>
          :
          null
          }
      </div>
      <div>{restaurants ? 
      <div>
        <RestaurantCards restaurants={restaurants} />
      </div>
      : null}</div>
      <Modal show={showSlateModal} onHide={() => handleClose()}>
          <Modal.Header closeButton>
          <Modal.Title>EDIT SLATE NAME:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group >
              <Form.Label>New Slate Name: </Form.Label>
              <Form.Control type="text" onChange={(event)=>handleChange(event)} value={updatedName} placeholder="name input"/>           
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={(event) => handleEditSlate(event)}>
              Submit 
          </Button>
          </Modal.Footer>
      </Modal>
    </main>
  );
};

export default SlateById;
