import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Auth from '../utils/auth'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_NON_FRIENDS } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import './FriendPage.css'

function FriendPage(props) {
  const [showAddFriendModal, setShowAddFriendModal] = useState(false)
  const [friendNameToAdd, setFriendNameToAdd] = useState('')
  const [friendIdToAdd, setFriendIdToAdd] = useState('')
  const [showAddedFriendMsg, setShowAddedFriendMsg] = useState(false)
  const { loading: meLoading, data: dataMe } = useQuery(QUERY_ME)
  const myInfo = dataMe?.me || []
  const myFriends = dataMe?.me.friends || [];
  const [addFriend] = useMutation(ADD_FRIEND);
  
  const newArrayofFriends = myFriends.map((friend)=>{
    const {username} = friend;
    return username
  })

  newArrayofFriends.push(myInfo.username)

  const {loading: nonFriendLoading, data: nonFriendData} = useQuery(QUERY_NON_FRIENDS, {variables: {friendNameArray: newArrayofFriends}})

  const nonFriendUsers = nonFriendData?.nonFriends || [] || {}

  const goToFriendProfile = (_id) => {
    window.location.replace(`/profile/${_id}`)
  }

  const renderAddFriendModal = (event) => {
    const selectedFriendId = event.target.getAttribute('data-id')
    const selectedFriendName = event.target.getAttribute('data-username')
  
    setShowAddFriendModal(true)
    setFriendIdToAdd(selectedFriendId)
    setFriendNameToAdd(selectedFriendName)
  }

  const handleAddFriend = () => {
    try {
      addFriend({
          variables: { _id: friendIdToAdd }
      });

      setShowAddedFriendMsg(true)
      setShowAddFriendModal(false)
      setFriendIdToAdd('')
    } catch (error) {
      console.error(error);
    }

  }

  const handleCloseAddFriend = () => {
    setShowAddFriendModal(false);
  }

  const handleCloseFriendAdded = () => {
    setShowAddedFriendMsg(false);
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (meLoading || nonFriendLoading) {
    return <h4>Loading...</h4>;
  }
  
  return (
    <div className="Wrapper friend-background">
      <div className="friend-header">
        <h2 className="center">Your Friends</h2>
      </div>
      <div className="cards">
        {myFriends[0] ?
        myFriends.map((friend)=>{
          return(
            <>
            <button key={friend._id} data-id={friend._id} data-username={friend.username} className="btn btn-lg btn-primary m-2 outline-delete mt-5" onClick={()=>goToFriendProfile(friend._id)}>
            {friend.avatar}{' '}{friend.username}
            </button>
            </>
          )
        })
        :
        <div className="no-friends-msg">
          <h4>No friends yet!</h4>
        </div>
        }
      </div>
      <br></br>
      {nonFriendUsers[0] ?
        <div className="friend-header">
          <h2 className="center">Suggested Friends To Follow</h2>
        </div>
      :
      null
      }
      <div className="cards">
        {nonFriendUsers ?
        nonFriendUsers.map((nonFriend)=>{
          return(
            <>
            <button key={nonFriend._id} data-id={nonFriend._id} data-username={nonFriend.username} className="btn btn-lg btn-primary m-2 outline-delete mt-5" onClick={(event)=>renderAddFriendModal(event)}>
            {nonFriend.avatar}{' '}{nonFriend.username}
            </button>
            </>
          )
        })
        :
        null
        }
      </div>
      {showAddFriendModal ?
      <Modal show={showAddFriendModal} onHide={() => handleCloseAddFriend()}>
        <Modal.Header closeButton onClick={()=>handleCloseAddFriend()}>
          <Modal.Title className="modalText">Add Friend?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="modalText">Add {friendNameToAdd} to get inspired by their slates!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary outline-delete" onClick={() => handleCloseAddFriend()}>Cancel</Button>
          <Button
            variant="primary outline-delete"
            onClick={() => handleAddFriend()}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      : null }
      {showAddedFriendMsg ?
      <Modal show={showAddedFriendMsg} onHide={() => handleCloseFriendAdded()}>
        <Modal.Header closeButton onClick={()=>handleCloseFriendAdded()}>
          <Modal.Title className="modalText">You're Friends!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="modalText">You're now friends with {friendNameToAdd}!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary outline-delete" onClick={() => handleCloseFriendAdded()}>Close</Button>
        </Modal.Footer>
      </Modal>
      : null }
    </div>
  );
}

export default FriendPage;
