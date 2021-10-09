// BRING IN JSON WEB TOKEN MODULE AND ENVIRONMENT VARIABLES
require('dotenv').config()
const jwt = require('jsonwebtoken');

// SET TOKEN SECRET AND EXPIRATION
const secret = process.env.SECRET;
const expiration = '2h';

module.exports = {
  // FUNCTION FOR OUR AUTHENTICATED ROUTES
  authMiddleware: function ({ req }) {
    // ALLOWS TOKEN TO BE SENT VIA REQ.BODY, REQ.QUERY OR HEADERS
    let token = req.body.token || req.query.token || req.headers.authorization;

    // SPLIT TOKEN INTO AN ARRAY AND RETURN ACTUAL TOKEN SEPARATED FROM 'BEARER'
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // IF NO TOKEN, SEND ERROR STATUS AND MESSAGE
    if (!token) {
      return req;
    }

    // IF TOKEN IS VERIFIED, ADD THE DECODED USER'S DATA TO THE REQUEST SO IT CAN BE ACCESSED BY THE RESOLVER, OTHERWISE SEND ERROR MESSAGE
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // RETURN REQUEST
    return req;
  },
  // PASSING THE USER'S USERNAME, EMAIL, AVATAR, ZIPCODE AND ID FROM THE LOGIN RESOLVER TO THE SIGNTOKEN FUNCTION
  signToken: function ({ email, username, _id, avatar, zipcode }) {
    const payload = { email, username, _id, avatar, zipcode };
    // USE JSON WEB TOKEN PACKAGE TO "HASH" USER INFO AND GIVE EXPIRATION OF TOKEN
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};