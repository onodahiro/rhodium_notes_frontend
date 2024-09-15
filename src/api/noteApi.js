import axios from 'axios';

import { showSuccessToast, showErrorToast } from '../components/utils/Toast.js'

const URL = process.env.REACT_APP_API_NOTES;
function lastPage(id = '') {
  return axios.get(`${URL}/last-page?byTagId=${id}`)
  .then(res => {
    return res.data
  })
  .catch(err => {
    showErrorToast(err);
  })
};

async function fetchNotes(model, page = 1) {
  model.setLoading(true);

  axios.get(`${URL}?page=${page}`)
  .then(res => {
    model.insert(res.data.data)
    model.setPages(res.data.meta)
  })
  .catch(err => {
    showErrorToast(err);
  })
  .finally(() => {
    setTimeout(model.setLoading, 100, false)
  })
};

async function fetchSaveNotes(model, text) {
  model.setLoading(true);
  axios.post(`${URL}/save`, { text })
  .then((res) => {
    if (res.data) {
      showSuccessToast(res.data.message)
      fetchNotes(model);
    }
  })
  .catch(err => {
    showErrorToast(err);
    setTimeout(model.setLoading, 100, false)
  })
}

function fetchCheckNote(model, id) {
  axios.get(`${URL}/check?id=${id}`)
  .then((res) => {
    if (res.data) {
      showSuccessToast('Saved successfully')
      model.updateChecked(res.data.id)
    }
  })
  .catch(err => {
    showErrorToast(err);
  })
}

async function fetchNotesByTag(model, id, page = 1) {

  axios.post(`${URL}/by-tag?page=${page}`,  { id })
  .then(res => {
    model.insert(res.data.data)
    model.setPages(res.data.meta)
  })
  .catch(err => {
    showErrorToast(err);
  })
  .finally(() => {
    setTimeout(model.setLoading, 100, false)
  })
}

async function fetchPreloadTags(model, text) {
  axios.get(`${URL}/tag?text=${text}`)
  .then(res => {
    model.changeResults(res.data.data)
  })
  .catch(err => {
    showErrorToast(err);
  })
  .finally(() => {
    model.changeLoading(false)
  })
}

export { fetchNotes, fetchSaveNotes, fetchCheckNote, fetchPreloadTags, fetchNotesByTag };