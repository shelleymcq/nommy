import React from 'react';
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

function FriendPage(props) {
  const { loading, data } = useQuery(QUERY_ME)
  const myFriends = data?.me.friends || [];

  const goToFriendProfile = (_id) => {
    window.location.replace(`/profile/${_id}`)
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (loading ) {
    return <h4>Loading...</h4>;
  }
  
  return (
    <div className="Wrapper">
      <div className="cards">
        {myFriends.map((friend)=>{
          return(
            <>
            <button className="btn btn-lg btn-primary m-2 outline-delete mt-5" onClick={()=>goToFriendProfile(friend._id)}>
            {friend.avatar}{' '}{friend.username}
            </button>
            </>
          )
        })
        }
      </div>
    </div>
  );
}

export default FriendPage;
