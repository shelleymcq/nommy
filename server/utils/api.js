// BRING IN AXIOS MODULE
const axios = require('axios')

// YELP FUSION API VARIABLES IN .ENV
const BASEURL = process.env.REACT_APP_BASEURL;
const APIKEY = process.env.REACT_APP_APIKEY;
const SEARCHQUERY = process.env.REACT_APP_SEARCH;

// AXIOS GET REQUEST TO PERFORM A SEARCH OF THE YELP FUSION API
// GIVEN A SEARCH INPUT AND ZIPCODE
module.exports = {
  search(searchInput, zipcode) {
    return axios.get(`${BASEURL}${zipcode}${SEARCHQUERY}${searchInput}`, {
        headers: {
            Authorization: `Bearer ${APIKEY}`
        },
    });
  },
};