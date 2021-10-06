const axios = require('axios')

const BASEURL = process.env.REACT_APP_BASEURL;
const APIKEY = process.env.REACT_APP_APIKEY;
const SEARCHQUERY = process.env.REACT_APP_SEARCH;

module.exports = {
  search(searchInput, zipcode) {
    return axios.get(`${BASEURL}${zipcode}${SEARCHQUERY}${searchInput}`, {
        headers: {
            Authorization: `Bearer ${APIKEY}`
        },
    });
  },
};