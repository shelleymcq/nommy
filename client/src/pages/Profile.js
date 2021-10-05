// Node Modules
import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

// Utilities
import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME, QUERY_MY_SLATES } from '../utils/queries';

// Components
import SlateCards from '../components/SlateCards/SlateCards'
import { ADD_SLATE } from '../utils/mutations';

const Profile = () => {
  const { id } = useParams();
  const [modalDisplay, setModalDisplay] = useState(false);
  const [slateToAdd, setSlateToAdd] = useState('');
  // Get current user
  const { loading, data } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });
  const [addSlate, { error }] = useMutation(ADD_SLATE);

  // Get a list of all users
  // const { usersLoading, data: usersData } = useQuery(QUERY_USERS);
  const user = data?.me || data?.user || {};
  // const users = usersData?.users || [];
  // console.log(user.username)
  // const slatesResponse = useQuery(QUERY_MY_SLATES, { variables: { slateCreator: user.username }})
  const slatesResponse = useQuery(QUERY_MY_SLATES, { variables: { slateCreator: user.username }});
  // console.log("slatesResponse:", slatesResponse)
  const mySlates = slatesResponse.data?.mySlates || [];

  // console.log("my slates:", mySlates)

  if (error) console.log(error);

  // redirect to personal profile page if username is yours
  // NOT SURE WHAT THIS IS DOING. Button in Header -> index.js folder redirects us here
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const renderModal = () => {
    setModalDisplay(true);
  }

  const handleClose = () => {
    setModalDisplay(false);
  }

  const handleChange = (event) => {
      const { value } = event.target;

      setSlateToAdd(value);
  }

  const handleSubmit = (event) => {
    
    event.preventDefault();
    
    try {
        addSlate({
            variables: { name: slateToAdd }
        });
        window.location.reload()
    } catch (e) {
        console.error(e);
    }
    console.log("new slate name:", slateToAdd)
    console.log(user.username)
    setModalDisplay(false);
    setSlateToAdd('');
  }

  const renderCurrentUserInfo = () => {
    // console.log(user.username)
    if (id) return null;
    return (
      <ul>
        <li>username: {user.username}</li>
        <li>email: {user.email}</li>
        <li>{user.avatar}</li>
      </ul>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {id ? `${user.username}'s` : 'your'} profile.
        </h2>
        <div>
          {renderCurrentUserInfo()}
          {/* {renderUserList()} */}
        </div>
        <div>
          <SlateCards slates={mySlates}/>
        </div>
          <div>
            <button className="btn btn-lg btn-light m-2" onClick={() => renderModal()}>
              Add Slate
            </button>
          </div>
          {modalDisplay ? 
            <Modal show={modalDisplay} onHide={() => handleClose()}>
            <Modal.Header closeButton>
            <Modal.Title>Slate to add restaurant to:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group >
                    <Form.Label>Slate name: </Form.Label>
                    <Form.Control type="text" onChange={(event)=>handleChange(event)} value={slateToAdd} placeholder="name input"/>           
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={(event) => handleSubmit(event)}>
                Submit 
            </Button>
            </Modal.Footer>
        </Modal>
          : null}
      </div>
    </div>
  );
};

export default Profile;
