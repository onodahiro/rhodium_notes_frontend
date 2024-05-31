import axios from 'axios';
//const axios = require('axios'); // legacy way

// Make a request for a user with a given ID
export function saveNote(body) {
axios.post(`${process.env.REACT_APP_API_NOTES}/save-note`, body)
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
})
.finally(function () {
  // always executed
});
}