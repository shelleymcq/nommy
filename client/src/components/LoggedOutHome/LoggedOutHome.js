// BRING IN REACT, USESTATE, REACT-ROUTER-DOM, REACT-BOOTSTRAP MODULES
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
// BRING IN QUERIES
import { useQuery } from '@apollo/client';
import { QUERY_RANDOM_SLATE } from '../../utils/queries';
// BRING IN REACT COMPONENTS FOR RENDERING PAGE
import RestaurantCards from '../RestaurantCards/RestaurantCards'
// CUSTOM STYLESHEET
import './LoggedOutHome.css';

const LoggedOutHome = () => {
  // QUERY DB FOR A RANDOM SLATE & GET DATA
  const { data } = useQuery(QUERY_RANDOM_SLATE);
  const randomSlate = data?.randomSlate || [];
  // STATE TO TOGGLE SHOWING/HIDING LOGIN/SIGNUP ALERT MODAL
  const [showLoginSignupModal, setLoginSignupModal] = useState(false);

  // HELPER TO CLOSE ALERT MODAL
  const handleClose = () => {
    setLoginSignupModal(false);
  }

  // HELPER TO SHOW ALERT MODAL
  const handlePageClick = () => {
    setLoginSignupModal(true)
  }

  // ENABLE USE HISTORY
  const history = useHistory();

  // HELPER TO DIRECT USER TO LOGIN PAGE
  const redirectToLogin = () => {
      history.push(`/login`);
  }

  // HELPER TO DIRECT USER TO SIGNUP PAGE
  const redirectToSignup = () => {
    history.push('/signup');
  }

  return (
    <main>
      <div className="slate-header" onClick={()=>handlePageClick()}>
        {/* SITE TAGLINE */}
        <h1 className="center">Your home for restaurant inspiration!</h1>
        {/* RANDOMLY SELECTED SLATE RENDERS BELOW */}
        <h2 className="center">{randomSlate.name}</h2>
        <h4>Slate created by {randomSlate.slateCreator}</h4>
      </div>
      {/* RENDER A CARD FOR EVERY RESTAURANT IN THE RANDOM SLATE */}
      <div onClick={()=>handlePageClick()}>
        {randomSlate.restaurants ? 
          <div>
            <RestaurantCards restaurants={randomSlate.restaurants} />
          </div>
        : 
          null
        }
      </div>

      {/* MODAL TO ALERT USER TO LOGIN OR SIGNUP */}
      {showLoginSignupModal ?
        <Modal 
          show={showLoginSignupModal} 
          onHide={() => handleClose()}
        >
          <Modal.Header 
            closeButton 
            onClick={()=>handleClose()}
          >
            <Modal.Title className="modalText">
              Oops!
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className="modalText">
              You need to be logged in to see this. 
              Use the navigation links above to sign up or log in and start saving restaurants!
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button 
              variant="primary outline-delete" 
              onClick={() => redirectToLogin()}
            >
              Login
            </Button>
            <Button 
              variant="primary outline-delete" 
              onClick={() => redirectToSignup()}
            >
              Signup
            </Button>
          </Modal.Footer>
        </Modal>
      : 
        null 
      }
    </main>
  );
};

export default LoggedOutHome;
