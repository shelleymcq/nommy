// Node Modules
import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// Utilities
import Auth from '../utils/auth';
import { QUERY_USERS, QUERY_USER, QUERY_ME } from '../utils/queries';
// Components
import UserList from '../components/UserList';
import AddSlateModal from '../components/AddSlateModal/AddSlateModal';

const Profile = () => {
  const { id } = useParams();
  const [modalDisplay, setModalDisplay] = useState(false);
  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // Get a list of all users
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];

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

  const renderUserList = () => {
    if (usersLoading) return null;
    // Only renders users who's profile we're not currently viewing
    const notMeUsers = users.filter(o => o._id !== user._id);
    return (
      <div className="col-12 col-md-10 mb-5">
        <UserList users={notMeUsers} title="User List" />
      </div>
    );
  };
  const renderModal = () => {
    setModalDisplay(true);
  }

  const renderCurrentUserInfo = () => {
    // console.log(user.username)
    if (id) return null;
    return (
      <ul>
        <li>username: {user.username}</li>
        <li>email: {user.email}</li>
        <li></li>
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
            <button className="btn btn-lg btn-light m-2" onClick={() => renderModal()}>
              Add Slate
            </button>
          </div>
          {modalDisplay ? <p>This is our modal</p> : null}
      </div>
    </div>
  );
};

export default Profile;
