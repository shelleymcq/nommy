// BRING IN REACT, USESTATE, AND REACT-BOOTSTRAP MODULES
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
// BRING IN AUTHENICATION SERVICES FUNCTIONS
import Auth from '../utils/auth'
// BRING IN MUTATIONS AND QUERIES
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_NON_FRIENDS } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
// CUSTOM STYLESHEET
import './FriendPage.css'

function FriendPage(props) {
  // STATE FOR TOGGLING BETWEEN SHOWING/HIDING 'ADD FRIEND' MODAL
  const [showAddFriendModal, setShowAddFriendModal] = useState(false)
  // STATE FOR HOLDING NAME OF FRIEND USER WISHES TO ADD TO FRIENDS
  const [friendNameToAdd, setFriendNameToAdd] = useState('')
  // STATE FOR HOLDING ID OF FRIEND USER WISHES TO ADD TO FRIENDS
  const [friendIdToAdd, setFriendIdToAdd] = useState('')
  // STATE FOR TOGGLING BETWEEN SHOWING/HIDING SUCCESS MSG FOR ADDING FRIEND
  const [showAddedFriendMsg, setShowAddedFriendMsg] = useState(false)

  // QUERY DB FOR LOGGED IN USER'S DATA
  const { loading: meLoading, data: dataMe } = useQuery(QUERY_ME)
  // GRAB LOGGED IN USER'S DATA AND THEIR ARRAY OF FRIENDS
  const myInfo = dataMe?.me || []
  const myFriends = dataMe?.me.friends || [];
  // CREATE NEW ARRAY TO HOLD JUST FRIENDS' USERNAMES
  const newArrayofFriends = myFriends.map((friend)=>{
    const {username} = friend;
    return username
  })
  // ADD LOGGED IN USER'S NAME TO ARRAY OF FRIENDS
  newArrayofFriends.push(myInfo.username)
  // QUERY DB FOR ALL USER'S THAT AREN'T THE LOGGED IN USER OR THEIR FRIENDS
  const {loading: nonFriendLoading, data: nonFriendData} = useQuery(QUERY_NON_FRIENDS, {variables: {friendNameArray: newArrayofFriends}})
  // GRAB ARRAY OF NON-FRIENDS (USERS) OR OBJECT IF ONLY 1 NON-FRIEND (USER) RETURNED
  const nonFriendUsers = nonFriendData?.nonFriends || [] || {}

  // USE MUTATION HOOK FOR ADDING A FRIEND TO LOGGED IN USER'S DATA
  const [addFriend] = useMutation(ADD_FRIEND);

  // HELPER FUNCTION TO LINK TO A FRIEND'S PROFILE
  const goToFriendProfile = (_id) => {
    window.location.replace(`/profile/${_id}`)
  }

  // IF USER CLICKS ON A FRIEND ON THEIR FRIENDS PAGE
  const renderAddFriendModal = (event) => {
    // GRAB THE FRIEND'S USER ID AND USERNAME
    const selectedFriendId = event.target.getAttribute('data-id')
    const selectedFriendName = event.target.getAttribute('data-username')
    
    // SHOW MODAL TO CONFIRM ADDING FRIEND
    setShowAddFriendModal(true)
    // SAVE FRIEND'S USER ID AND USERNAME TO STATE
    setFriendIdToAdd(selectedFriendId)
    setFriendNameToAdd(selectedFriendName)
  }

  // WHEN USER CONFIRMS ADDING FRIEND IN MODAL
  const handleAddFriend = () => {
    // PUSH USER'S DATA TO LOGGED IN USER'S FRIENDS ARRAY
    try {
      addFriend({
          variables: { _id: friendIdToAdd }
      });

      // SHOW SUCCESS MODAL FOR ADDING FRIEND
      setShowAddedFriendMsg(true)
      // HIDE CONFIRMATION MODAL FOR ADDING FRIEND
      setShowAddFriendModal(false)
      // CLEAR STATE FOR FRIEND ID
      setFriendIdToAdd('')
    } catch (error) {
      console.error(error);
    }

  }

  // HELPER TO HIDE CONFIRMATION MODAL
  const handleCloseAddFriend = () => {
    setShowAddFriendModal(false);
  }

  // HELPER TO HIDE SUCCESS MODAL
  const handleCloseFriendAdded = () => {
    setShowAddedFriendMsg(false);
  }

  // MUST BE LOGGED IN TO VIEW PAGE
  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  // IF DATA IS LOADING, SO LOADING
  if (meLoading || nonFriendLoading) {
    return <h4>Loading...</h4>;
  }
  
  return (
    <div className="Wrapper friend-background">
      <div className="friend-header">
        <h2 className="center">Your Friends</h2>
      </div>
      <div className="cards">
        {/* SHOW ALL FRIENDS WITH USERNAME & AVATAR AS CLICKABLE LINKS TO THEIR PROFILES */}
        {myFriends[0] ?
          myFriends.map((friend)=>{
            return(
              <>
              <button
                key={friend._id}
                data-id={friend._id} 
                data-username={friend.username} 
                className="btn btn-lg btn-primary m-2 outline-delete mt-5" 
                onClick={()=>goToFriendProfile(friend._id)}
              >
                {friend.avatar}{' '}{friend.username}
              </button>
              </>
            )
          })
        :
          // PAGE DISPLAY IF NO FRIENDS ADDED YET...
          <div className="no-friends-msg">
            <h4>No friends yet!</h4>
          </div>
        }
      </div>
      <br></br>

      {/* CONTAINER FOR SUGGESTED FRIENDS TO FOLLOW */}
      {nonFriendUsers[0] ?
        <div className="friend-header">
          <h2 className="center">Suggested Friends To Follow</h2>
        </div>
      :
        null
      }

      {/* SHOW ALL SUGGESTED FRIENDS, CLICKABLE TO ADD AS A FRIEND */}
      <div className="cards">
        {nonFriendUsers ?
        nonFriendUsers.map((nonFriend)=>{
          return(
            <>
            <button 
              key={nonFriend._id} 
              data-id={nonFriend._id} 
              data-username={nonFriend.username} 
              className="btn btn-lg btn-primary m-2 outline-delete mt-5" 
              onClick={(event)=>renderAddFriendModal(event)}
            >
              {nonFriend.avatar}{' '}{nonFriend.username}
            </button>
            </>
          )
        })
        :
          null
        }
      </div>

      {/* MODAL TO CONFIRM ADDING A FRIEND */}
      {showAddFriendModal ?
        <Modal 
          show={showAddFriendModal} 
          onHide={() => handleCloseAddFriend()}
        >
          <Modal.Header 
            closeButton 
            onClick={()=>handleCloseAddFriend()}
          >
            <Modal.Title className="modalText">
              Add Friend?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className="modalText">
              Add {friendNameToAdd} to get inspired by their slates!
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button 
              variant="primary outline-delete" 
              onClick={() => handleCloseAddFriend()}
            >
              Cancel
            </Button>
            <Button
              variant="primary outline-delete"
              onClick={() => handleAddFriend()}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      : 
        null 
      }

      {/* MODAL FOR SUCCESSFULLY ADDING FRIEND */}
      {showAddedFriendMsg ?
        <Modal 
          show={showAddedFriendMsg} 
          onHide={() => handleCloseFriendAdded()}
        >
          <Modal.Header 
            closeButton 
            onClick={()=>handleCloseFriendAdded()}
          >
            <Modal.Title className="modalText">
              You're Friends!
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className="modalText">
              You're now friends with {friendNameToAdd}!
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button 
              variant="primary outline-delete" 
              onClick={() => handleCloseFriendAdded()}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      : 
        null 
      }
    </div>
  );
}

export default FriendPage;
