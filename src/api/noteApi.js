import axios from 'axios';

import { showSuccessToast, showErrorToast } from '../components/utils/toast.js'

function lastPage(tag = '') {
  return axios.get(`${process.env.REACT_APP_API_NOTES}/last-page?byTag=${tag}`)
  .then(res => {
    return res.data
  }).catch(err => {
    showErrorToast(err);
  })
};

async function fetchNotes(model, page) {
  model.setLoading(true);

  let last_page = page
  if (!page) {
    last_page = await lastPage();
  }

  axios.get(`${process.env.REACT_APP_API_NOTES}?page=${last_page}`)
  .then(res => {
    model.insert(res.data.data)
    model.insertPages(res.data.meta)
  }).catch(err => {
    showErrorToast(err);
  }).finally(() => {
    setTimeout(model.setLoading, 100, false)
  })
};

async function fetchSaveNotes(model, text) {
  model.setLoading(true);
  
  axios.post(`${process.env.REACT_APP_API_NOTES}/save`, { text })
  .then((res) => {
    if (res.data) {
      showSuccessToast(res.data.message)
      fetchNotes(model);
    }
  }).catch(err => {
    showErrorToast(err);
    setTimeout(model.setLoading, 100, false)
  })
}

function fetchCheckNote(model, id) {
  axios.get(`${process.env.REACT_APP_API_NOTES}/check?id=${id}`)
  .then((res) => {
    if (res.data) {
      showSuccessToast('Saved successfully')
      model.updateChecked(res.data.id)
    }
  }).catch(err => {
    showErrorToast(err);
  })
}

async function searchNotes(model, tag, page) { // to do search notes

  let last_page = page
  if (!page) {
    last_page = await lastPage(tag);
  }

  axios.get(`${process.env.REACT_APP_API_NOTES}?byTag=${tag}`)
  .then(res => {
    model.insert(res.data.data)
    model.insertPages(res.data.meta)
  }).catch(err => {
    showErrorToast(err);
  }).finally(() => {
    setTimeout(model.setLoading, 100, false)
  })
}

async function fetchPreloadTags(model, text) {
  axios.get(`${process.env.REACT_APP_API_NOTES}/tag?text=${text}`)
  .then(res => {
    model.changeResults(res.data.data)
  }).catch(err => {
    showErrorToast(err);
  }).finally(() => {
    model.changeLoading(false)
  })
}

export { fetchNotes, fetchSaveNotes, fetchCheckNote, fetchPreloadTags };