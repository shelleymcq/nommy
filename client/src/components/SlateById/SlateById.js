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
import './SlateById.css'


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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [removeSlate] = useMutation(REMOVE_SLATE);
    const [editSlate] = useMutation(EDIT_SLATE);

    const history = useHistory();

    const redirect = () => {
        history.push(`/profile`);
        history.go(0)
    }

    const goToSearch = () => {
      history.push(`/search`);
    }

    const handleEditClick = (event) => {
      setShowSlateModal(true)
    }

    const handleClose = () => {
      setShowSlateModal(false);
      setShowDeleteModal(false);
    }

    const handleChange = (event) => {
      const { value } = event.target;

      setUpdatedName(value);
  }

    const handleEditSlate = (event) => {
      event.preventDefault()
      
      try {
        editSlate({
            variables: { _id: id, name: updatedName }
        });

        window.location.reload();
      } catch (error) {
        console.error(error);
      }

    }

    const renderDeleteConfirmModal = (slateId) => {
      setShowDeleteModal(true);
    }

    const handleDeleteSlate = (slateId) => {
    
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
      <div className="edit-delete-div">
        {Auth.getProfile().data.username === returnedSlate.slateCreator ? 
          <>
          <Button
            className='btn-block btn outline-delete'
            // onClick={() => handleDeleteSlate(returnedSlate._id)}
            onClick={()=>renderDeleteConfirmModal(returnedSlate._id)}
          >
            <i class="fas fa-trash"></i>
          </Button>
          <Button
            className='btn-block btn outline-delete'
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
      <div>
        <button className="btn btn-lg btn-primary m-2 outline-delete mt-5" onClick={() => goToSearch()}>
          Add Restaurants
        </button>
      </div>
      {restaurants ? 
        <RestaurantCards restaurants={restaurants} />
        : null
      }
      <Modal show={showSlateModal} onHide={() => handleClose()}>
          <Modal.Header closeButton onClick={()=>handleClose()}>
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
      {showDeleteModal ?
      <Modal show={showDeleteModal} onHide={() => handleClose()}>
        <Modal.Header closeButton onClick={()=>handleClose()}>
          <Modal.Title className="modalText">Delete Slate</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="modalText">Are you sure you want to delete {returnedSlate.name}?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary outline-delete" onClick={() => handleClose()}>Cancel</Button>
          <Button variant="primary outline-delete" onClick={() => handleDeleteSlate(returnedSlate._id)}>Delete Slate</Button>
        </Modal.Footer>
      </Modal>
      : null }
    </main>
  );
};

export default SlateById;
