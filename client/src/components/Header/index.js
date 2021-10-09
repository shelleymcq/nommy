// BRING IN REACT, REACT-ROUTER-DOM MODULES
import React from 'react';
import { Link } from 'react-router-dom';
// CUSTOM STYLESHEET
import './header.css'
// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../../utils/auth';
// BRING IN LOGO IMAGE FOR RENDERING IN HEADER
import NewLogo from '../../assets/img/newLogo3.png'


const Header = () => {

  // HELPER TO LOGOUT A USER
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.replace('/')
  };

  // HELPER TO RUNAPI SEARCH
  const runApi = ()=>{
    window.location.replace('/')
  }

  // HELPER TO RENDER NAV BAR LINKS
  const renderControls = () => {

    // IF LOGGED IN, SHOW HOME, PROFILE, MY FRIENDS, SEARCH, LOGOUT BTNS
    if (Auth.loggedIn()) {
      return (
        <div className='navbar-nav ml-auto'>
          <Link 
            className="btn btn-outline-light m-2 nav-color nav-item" 
            to="/" 
            onClick={()=>runApi()}
          >
            Home
          </Link>
          <Link 
            className="btn btn-outline-light m-2 nav-color nav-item" 
            to="/profile"
          >
            {Auth.getProfile().data.username}'s Profile
          </Link>
          <Link 
            className="btn btn-outline-light m-2 nav-color nav-item" 
            to="/friends"
          >
            My Friends
          </Link>
          <Link 
            className="btn btn-outline-light m-2 nav-color nav-item" 
            to="/search"
          >
            Search
          </Link>
          <button 
            className="btn btn-outline-light m-2 nav-color nav-item" 
            onClick={logout}
          >
            Logout
          </button>
        </div>
      );
    }
    
    // IF USER LOGGED OUT, SHOW LOGIN AND SIGNUP BUTTONS
    return (
      <div className='navbar-nav ml-auto'>
        <Link 
          className="btn btn-outline-light m-2 nav-color nav-item" 
          to="/login"
        >
          Login
        </Link>
        <Link 
          className="btn btn-outline-light m-2 nav-color nav-item" 
          to="/signup"
        >
          Signup
        </Link>
      </div>
    )
  };

  // RENDER NAV-BAR WITH LOGO AND CONDITIONAL NAV-LINKS
  return (
        <nav className="container-fluid navbar navbar-expand-lg">
          <a href="/">
            <img src={NewLogo} alt="logo" height="55px" width="150px" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon navbar-dark"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {renderControls()}
          </div>
        </nav>

)
};


export default Header;
