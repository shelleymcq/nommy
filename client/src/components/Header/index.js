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

  const runApi = ()=>{
    window.location.replace('/')
  }

  const renderControls = () => {
    if (Auth.loggedIn()) {
      return (
        <div className='navbar-nav ml-auto' id="navbar-mobile">
          <Link className="btn btn-outline-light m-2 nav-color nav-item" to="/" onClick={()=>runApi()}>
            Home
          </Link>
          <Link className="btn btn-outline-light m-2 nav-color nav-item" to="/profile">
            {Auth.getProfile().data.username}'s Profile
          </Link>
          <Link className="btn btn-outline-light m-2 nav-color nav-item" to="/friends">
            My Friends
          </Link>
          <Link className="btn btn-outline-light m-2 nav-color nav-item" to="/search">
            Search
          </Link>
          <button className="btn btn-outline-light m-2 nav-color nav-item" onClick={logout}>
            Logout
          </button>
        </div>
      );
    }
    return (
      <div className='navbar-nav ml-auto' id="navbar-mobile">
        <Link className="btn btn-outline-light m-2 nav-color nav-item" to="/login">
          Login
        </Link>
        <Link className="btn btn-outline-light m-2 nav-color nav-item" to="/signup">
          Signup
        </Link>
      </div>
    )
  };

  return (
    // <div className="navBtn">
    //   <nav className="navbar navbar-expand-lg">
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
    //   </nav>
    // </div>
)
};


export default Header;
