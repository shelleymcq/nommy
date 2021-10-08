// Node Modules
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom'
// Utilities
import { QUERY_RANDOM_SLATE } from '../../utils/queries';
// Components
import RestaurantCards from '../RestaurantCards/RestaurantCards'
// Styling
import './LoggedOutHome.css';

const LoggedOutHome = () => {
  const { data } = useQuery(QUERY_RANDOM_SLATE);
  const randomSlate = data?.randomSlate || [];
  const [showLoginSignupModal, setLoginSignupModal] = useState(false);

  const handleClose = () => {
    setLoginSignupModal(false);
  }

  const handlePageClick = () => {
    setLoginSignupModal(true)
  }

  const history = useHistory();

  const redirectToLogin = () => {
      history.push(`/login`);
  }

  const redirectToSignup = () => {
    history.push('/signup');
  }

  return (
    <main>
      <div className="slate-header" onClick={()=>handlePageClick()}>
        <h1 className="center">Your home for restaurant inspiration!</h1>
        <h2 className="center">{randomSlate.name}</h2>
        <h4>Slate created by {randomSlate.slateCreator}</h4>
      </div>
      <div onClick={()=>handlePageClick()}>{randomSlate.restaurants ? 
      <div>
        <RestaurantCards restaurants={randomSlate.restaurants} />
      </div>
      : null}
      </div>
      {showLoginSignupModal ?
      <Modal show={showLoginSignupModal} onHide={() => handleClose()}>
        <Modal.Header closeButton onClick={()=>handleClose()}>
          <Modal.Title className="modalText">Oops!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="modalText">You need to be logged in to see this. Use the navigation links above to
        sign up or log in and start saving restaurants!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary outline-delete" onClick={() => redirectToLogin()}>Login</Button>
          <Button variant="primary outline-delete" onClick={() => redirectToSignup()}>Signup</Button>
        </Modal.Footer>
      </Modal>
      : null }
    </main>
  );
};

export default LoggedOutHome;
