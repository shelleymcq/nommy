import React from 'react';
import './Footer.css'
// import { useLocation, useHistory } from 'react-router-dom';

const Footer = () => {
  // const location = useLocation();
  // const history = useHistory();
  return (
    <footer className="footer w-100 mt-auto p-2">
      <div className="container text-center mb-2">
        {/* {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => history.goBack()}
          >
            &larr; Go Back
          </button>
        )} */}
        <h4>
          Made with
          {' '}
          

          <span>&#127863;
          </span>{' '}
          by the Nommy Team.
        </h4>
        <h6>
          <p>Powered by <i className="fab fa-yelp"></i>
          </p>
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
