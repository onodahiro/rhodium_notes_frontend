import axios from 'axios';

import { showSuccessToast, showErrorToast } from '../components/utils/toast.js'

function lastPage() {
  return axios.get(`${process.env.REACT_APP_API_NOTES}/last`)
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
  let last_page = await lastPage();

  axios.post(`${process.env.REACT_APP_API_NOTES}/save?page=${last_page}`, { text })
  .then((res) => {
    if (res.data) {
      showSuccessToast('Saved successfully')
      model.insert(res.data.data)
      model.insertPages(res.data.meta)
    }
  }).catch(err => {
    showErrorToast(err);
  }).finally(() => {
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

export { fetchNotes, fetchSaveNotes, fetchCheckNote };