import axios from 'axios';
//const axios = require('axios'); // legacy way

export function requestSaveNote(body) {
  return axios.post(`${process.env.REACT_APP_API_NOTES}/save-note`, body)
}

  // export function* saveNote(body) {
    
// var response = yield requestSaveNote(body);
// console.log(response.next());
//   console.log(response)
// }

// function requestSaveNote(body) {
//   const { data } = axios.post(`${process.env.REACT_APP_API_NOTES}/save-note`, body)
//   return data;
// }