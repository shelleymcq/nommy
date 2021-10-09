// BRING IN REACT, USESTATE, REACT-BOOTSTRAP, REACT-ROUTER-DOM MODULES
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom'
// BRING IN QUERIES AND MUTATIONS
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SLATE } from '../../utils/queries';
import { REMOVE_SLATE, EDIT_SLATE } from '../../utils/mutations'
// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../../utils/auth';
// BRING IN REACT COMPONENTS FOR RENDERING PAGE
import RestaurantCards from '../RestaurantCards/RestaurantCards'
// CUSTOM STYLESHEET
import './SlateById.css'


const SlateById = () => {
  // GRAB SLATE ID FROM URL PARAMS
  const { id } = useParams();
  // QUERY DB FOR THAT SLATE BY ID
  const { loading, data } = useQuery(QUERY_SLATE, {
      variables: { id },
    });
  // GRAB SLATE DATA & IT'S RESTAURANTS' DATA
  const returnedSlate = data?.slate || [];
  const restaurants = data?.slate.restaurants || [];
  // STATE TO TOGGLE SHOWING/HIDING EDIT SLATE NAME MODAL
  const [showSlateModal, setShowSlateModal] = useState(false);
  // SLATE TO HOLD USER'S INPUT FOR NEW SLATE NAME
  const [updatedName, setUpdatedName] = useState('');
  // STATE TO TOGGLE SHOWING/HIDING DELETE SLATE CONFIRMATION MODAL
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // USE MUTATIONS TO REMOVE A SLATE FROM DB AND EDIT A SLATE NAME IN DB
  const [removeSlate] = useMutation(REMOVE_SLATE);
  const [editSlate] = useMutation(EDIT_SLATE);

  // ENABLE USE OF HISTORY
  const history = useHistory();
  
  // HELPER TO REDIRECT TO PROFILE PAGE
  const redirect = () => {
      history.push(`/profile`);
      history.go(0)
  }

  // HELPER TO REDIRECT TO SEARCH PAGE
  const goToSearch = () => {
    history.push(`/search`);
  }

  // HELPER TO SHOW EDIT SLATE NAME MODAL
  const handleEditClick = () => {
    setShowSlateModal(true)
  }

  // HELPER TO HIDE EDIT/DELETE SLATE MODALS
  const handleClose = () => {
    setShowSlateModal(false);
    setShowDeleteModal(false);
  }

  // AS USER ENTERS NEW SLATE NAME, UPDATE STATE
  const handleChange = (event) => {
    const { value } = event.target;

    setUpdatedName(value);
  }

  // UPON SUBMISSION OF EDIT SLATE NAME FORM
  const handleEditSlate = (event) => {
    event.preventDefault()
    
    // FIND SLATE BY ID AND UPDATE WITH NEW NAME
    try {
      editSlate({
          variables: { _id: id, name: updatedName }
      });
      
      // THEN HIDE EDIT SLATE MODAL
      setShowSlateModal(false)
      window.location.reload()
    } catch (error) {
      console.error(error);
    }

  }

  // HELPER TO SHOW DELETE SLATE CONFIRMATION MODAL
  const renderDeleteConfirmModal = (slateId) => {
    setShowDeleteModal(true);
  }

  // WHEN USER CONFIRMS DELETION OF SLATE
  const handleDeleteSlate = (slateId) => {
    
    // FIND & DELETE SLATE BY ID
    try {
      removeSlate({
          variables: { _id: slateId }
      });

      // GO BACK TO PROFILE PAGE
      redirect();
    } catch (error) {
      console.error(error);
    }
  }

  // USER MUST BE LOGGED IN
  if (!Auth.loggedIn()) {
    window.location.replace('/')
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
        {/* ONLY SHOW EDIT & DELETE SLATE BTNS IF IT'S THE USER'S SLATE */}
        {Auth.getProfile().data.username === returnedSlate.slateCreator ? 
          <>
          <Button
            className='btn-block btn outline-delete'
            id="delete-slate-btn"
            onClick={()=>renderDeleteConfirmModal(returnedSlate._id)}
          >
            <i className="fas fa-trash"></i>
          </Button>
          <Button
            className='btn-block btn outline-delete'
            id="edit-slate-btn"
            onClick={(event) => handleEditClick(event)}
          >
            <i className="fas fa-pen"></i>
          </Button>
          </>
        :
          null
        }
      </div>
      {/* ONLY SHOW THE OPTION TO ADD RESTAURANTS IF IT'S THE USER'S SLATE */}
      {Auth.getProfile().data.username === returnedSlate.slateCreator ?
        <div>
          <button 
            className="btn btn-lg btn-primary m-2 outline-delete mt-5" 
            onClick={() => goToSearch()}
          >
            Add Restaurants
          </button>
        </div>
      :
        null
      }
      
      {/* RENDER EACH RESTAURANT AS A CARD */}
      {restaurants ? 
        <RestaurantCards restaurants={restaurants} />
      : 
        null
      }

      {/* MODAL FOR EDITING A SLATE NAME */}
      <Modal 
        show={showSlateModal} 
        onHide={() => handleClose()}
      >
        <Modal.Header 
          closeButton onClick={()=>handleClose()}
        >
        <Modal.Title>
          EDIT SLATE NAME:
        </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group >
            <Form.Label>New Slate Name: </Form.Label>
            <Form.Control 
              type="text" 
              onChange={(event)=>handleChange(event)} 
              value={updatedName} 
              placeholder="name input"/>           
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={(event) => handleEditSlate(event)}
          >
            Submit 
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL TO CONFIRM DELETING SLATE */}
      {showDeleteModal ?
        <Modal 
          show={showDeleteModal} 
          onHide={() => handleClose()}
        >
          <Modal.Header 
            closeButton onClick={()=>handleClose()}
          >
            <Modal.Title className="modalText">
              Delete Slate
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className="modalText">
              Are you sure you want to delete {returnedSlate.name}?
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button 
              variant="primary outline-delete" 
              onClick={() => handleClose()}>Cancel
            </Button>
            <Button 
              variant="primary outline-delete" 
              onClick={() => handleDeleteSlate(returnedSlate._id)}
            >
              Delete Slate
            </Button>
          </Modal.Footer>
        </Modal>
      : 
        null
      }
    </main>
  );
};

export default SlateById;
