import axios from 'axios';
//const axios = require('axios'); // legacy way

export function requestGetNotes(page = 1) {
  return axios.get(`${process.env.REACT_APP_API_NOTES}?page=${page}`)
}

export function requestSaveNotes(body) {
  return axios.post(`${process.env.REACT_APP_API_NOTES}/save`, body)
}
