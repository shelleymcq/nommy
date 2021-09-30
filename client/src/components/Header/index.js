import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const renderControls = () => {
    // If logged in show logout controls
    if (Auth.loggedIn()) {
      return (
        <>
          <Link className="btn btn-lg btn-info m-2" to="/me">
            {Auth.getProfile().data.username}'s profile
          </Link>
          <Link className="btn btn-lg btn-info m-2" to="/friends">
            myFriends
          </Link>
          <button className="btn btn-lg btn-light m-2" onClick={logout}>
            Logout
          </button>
        </>
      );
    }
    // If logged out show login controls
    return (
      <>
        <Link className="btn btn-lg btn-info m-2" to="/login">
          Login
        </Link>
        <Link className="btn btn-lg btn-light m-2" to="/signup">
          Signup
        </Link>
      </>
    )
  };

  return (
    <div>
      {/* changes navbar colors */}
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<div className="container-fluid">
<Link className="navbar-brand" to="/home"><img src="./assets/images/logo.png" alt="logo" height="65px" width="100px"/></Link>
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarSupportedContent">

{/* Search Bar
  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <section className="search-bar">
          <div className="container">
              <div className="row">
                  <div className="col-lg-10 mx-auto">
                      <form>
                          <div>
                              <div className="input-group">
                                  <input type="search" placeholder="Search for nommy stuff" className="form-control" />
                                  <div className="input-group-append">
                                      <div className="btn-group">
                                          <button type="submit" className="btn-info"><i className="fas fa-search"></i></button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </section>
  </ul> */}

{/* right side of navbar */}
  {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    <li className="nav-item">
      <Link className="nav-link" to="/profile">My Profile</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/friends">My Friends</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/login">Login</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/signup">Signup</Link>
    </li>
  </ul> */}
  {renderControls()}
  </div>
</div>
</nav>

</div>
)
//   return (
//     <header className="bg-dark text-light mb-4 py-3 flex-row align-center">
//       <div className="container flex-row justify-space-between-lg justify-center align-center">
//         <div>
//           <Link className="text-light" to="/">
//             <h1 className="m-0">Fun User List</h1>
//           </Link>
//         </div>
//         <div>
//           <p className="m-0 text-center">Simple App to View Users.</p>
//           {renderControls()}
//         </div>
//       </div>
//     </header>
//   );
};

export default Header;
