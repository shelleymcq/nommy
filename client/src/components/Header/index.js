import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'
import Auth from '../../utils/auth';
import NewLogo from '../../assets/img/newLogo3.png'


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.replace('/')
  };

  const renderControls = () => {
    if (Auth.loggedIn()) {
      return (
        <div className='navbar-nav ml-auto'>
          <Link className="btn btn-outline-light m-2" to="/">
            Home
          </Link>
          <Link className="btn btn-outline-light m-2" to="/profile">
            {Auth.getProfile().data.username}'s profile
          </Link>
          <Link className="btn btn-outline-light m-2" to="/friends">
            myFriends
          </Link>
          <Link className="btn btn-outline-light m-2" to="/search">
            Search
          </Link>
          <button className="btn btn-outline-light m-2" onClick={logout}>
            Logout
          </button>
        </div>
      );
    }
    return (
      <div className='navbar-nav ml-auto'>
        <Link className="btn btn-outline-light m-2" to="/login">
          Login
        </Link>
        <Link className="btn btn-outline-light m-2" to="/signup">
          Signup
        </Link>
      </div>
    )
  };

  return (
    <div className="navBtn">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a href="/">
            <img src={NewLogo} alt="logo" height="55px" width="150px" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {renderControls()}
          </div>
        </div>
      </nav>
    </div>
  )
};

export default Header;
