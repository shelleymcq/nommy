const axios = require('axios')

const BASEURL = process.env.REACT_APP_BASEURL;
const APIKEY = process.env.REACT_APP_APIKEY;

module.exports = {
  search(searchInput) {
    return axios.post(`${BASEURL}${searchInput}`, {
        headers: {
            Authorization: `Bearer ${APIKEY}`
       },
    });
  },
};