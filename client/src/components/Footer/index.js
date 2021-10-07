import React from 'react';
import './Footer.css'


const Footer = () => {

  return (
    <footer className="footer">
      <div className="container">
        <h4>
          Made with
          {' '}
          <span>&#129347;
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
