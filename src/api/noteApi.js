import axios from 'axios';

import { showSuccessToast, showErrorToast } from '../components/utils/toast.js'

function lastPage(tag = '') {
  return axios.get(`${process.env.REACT_APP_API_NOTES}/last?byTag=${tag}`)
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

const searchNotes = async (model, tag, page) => {

  let last_page = page
  if (!page) {
    last_page = await lastPage(tag);
  }

  console.log(model, tag);
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

export { fetchNotes, fetchSaveNotes, fetchCheckNote, searchNotes };