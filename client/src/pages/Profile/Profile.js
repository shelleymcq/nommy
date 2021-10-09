// BRING IN REACT, USESTATE, REACT-BOOTSTRAP & REACT-ROUTER-DOM MODULES
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
// CUSTOM STYLESHEET
import './Profile.css'
// BRING IN QUERIES & MUTATIONS
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME, QUERY_MY_SLATES, QUERY_SLATE_IMAGE } from '../../utils/queries';
import { ADD_SLATE } from '../../utils/mutations';
// BRING IN REACT COMPONENTS FOR RENDERING PAGE
import SlateCards from '../../components/SlateCards/SlateCards'


const Profile = () => {
  // GRAB ID FROM URL PARAMS
  const { id } = useParams();
  // STATE TO TOGGLE SHOWING/HIDING MODAL FOR ADDING A SLATE
  const [modalDisplay, setModalDisplay] = useState(false);
  // STATE TO HOLD NAME OF SLATE TO ADD
  const [slateToAdd, setSlateToAdd] = useState('');
  // STATE TO TOGGLE SHOWING/HIDING WARNING MSG ON ADD SLATE MODAL
  const [showWarning, setShowWarning] = useState(false);
  
  // IF /PROFILE/:ID, QUERY DB FOR USER DATA BY ID
  // IF /PROFILE, QUERY DB FOR LOGGED IN USER'S DATA
  const { loading, data } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });
  // GRAB EITHER LOGGED IN USER DATA OR USER DATA BY ID
  const user = data?.me || data?.user || {};
  // QUERY DB FOR SLATES OF PROFILE PAGE (EITHER LOGGED IN USER OR OTHER USER)
  const slatesResponse = useQuery(QUERY_MY_SLATES, { variables: { slateCreator: user.username }});
  // GRAB SLATE DATA FOR USER
  const mySlates = slatesResponse.data?.mySlates || [];
  // QUERY DB FOR EACH SLATE'S LAST SAVED RESTAURANT DATA & GRAB DATA
  const slatesRestaurantResponse = useQuery(QUERY_SLATE_IMAGE, { variables: { slateCreator: user.username }});
  const myRestaurants = slatesRestaurantResponse.data?.slateImage || [];  
  // USE MUTATION TO ADD A SLATE TO THE LOGGED IN USER'S PROFILE
  const [addSlate, { error }] = useMutation(ADD_SLATE);

  if (error) console.log(error);

  if (loading ) {
    return <h4>Loading...</h4>;
  }

  // USER MUST BE LOGGED IN
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  // HELPER TO SHOW 'ADD SLATE' MODAL
  const renderModal = () => {
    setModalDisplay(true);
  }

  // HELPER TO CLOSE 'ADD SLATE' MODAL
  const handleClose = () => {
    setModalDisplay(false);
  }

  // AS USER TYPES NEW SLATE NAME, UPDATE STATE
  const handleChange = (event) => {
      const { value } = event.target;

      // IF THERE'S AN INPUT, HIDE WARNING MSG
      if(value){
        setShowWarning(false)
      }

      setSlateToAdd(value);
  }

  // WHEN USER SUBMITS A SLATE NAME TO ADD TO PROFILE
  const handleSubmit = (event) => {
    event.preventDefault();

    // SHOW WARNING, IF NO SLATE NAME GIVEN
    if (!slateToAdd) {
      setShowWarning(true)
      // DON'T ALLOW FORM SUBMISSION
      return 
    }

    // ADD NEW SLATE TO USER'S PROFILE GIVEN SLATE NAME
    try {
        addSlate({
            variables: { name: slateToAdd }
        });
        window.location.reload()
    } catch (e) {
        console.error(e);
    }
    // HIDE 'ADD SLATE' MODAL AND CLEAR STATE
    setModalDisplay(false);
    setSlateToAdd('');
  }

  return (
    <div className='profile-card'>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 text-light p-3 mb-1">
          Viewing {user.username}'s profile<span>&nbsp;{user.avatar}</span>
          <div>
            {/* ONLY SHOW 'ADD SLATE' BUTTON IF VIEWING YOUR OWN PROFILE */}
            {!id ?
              <button
                className="btn btn-lg btn-primary m-2 outline-delete mt-5"
                onClick={() => renderModal()}
              >
                Add Slate
              </button>
            :
              null
            }
          </div>
        </h2>

        {/* SHOW IF USER HAS NO SAVED SLATES */}
        {mySlates.length < 1 ?
          <>
          <div className="no-slates-yet-div">
            <h4>No slates have been added yet!</h4>
          </div>
          </>
        :
          null
        }

        {/* RENDER A CARD COMPONENT FOR EACH OF THE USER'S SLATES */}
        {/* PASS ARRAY OF EACH'S SLATE'S LAST SAVED RESTAURANT AS PROP FOR RENDING SLATE COVER IMAGE */}
        <div>
          <SlateCards slates={mySlates} restaurants={myRestaurants}/>
        </div>

        {/* MODAL FOR ADDING A NEW SLATE TO LOGGED IN USER'S PROFILE */}
        {modalDisplay ? 
          <Modal 
            show={modalDisplay}
            onHide={() => handleClose()}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Slate to add restaurant to:
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group >
                <Form.Label>Slate name: </Form.Label>
                <Form.Control type="text"
                  onChange={(event)=>handleChange(event)}
                  value={slateToAdd}
                  placeholder="name"
                  required
                />           
              </Form.Group>
              {showWarning ?
                <p className="warning-message">
                  You must enter a name for your slate!
                </p>
              : 
                null
              }
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="primary outline-delete"
                onClick={(event) => handleSubmit(event)}
              >
                Add Slate 
              </Button>
            </Modal.Footer>
          </Modal>
        : 
          null
        }
      </div>
    </div>
  );
};

export default Profile;
