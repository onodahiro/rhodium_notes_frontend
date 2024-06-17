import axios from 'axios';

function requestGetNotes(page = 1) {
  return axios.get(`${process.env.REACT_APP_API_NOTES}?page=${page}`)
};

function requestSaveNotes(body) {
  return axios.post(`${process.env.REACT_APP_API_NOTES}/save`, body)
};

function requestCheckNote(id) {
  return axios.get(`${process.env.REACT_APP_API_NOTES}/check?id=${id}`)
};

export { requestGetNotes, requestSaveNotes, requestCheckNote  };