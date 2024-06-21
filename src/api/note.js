import axios from 'axios';

import showToast from '../components/utils/toast.js'

function fetchNotes(model, page = 1) {
  model.setLoading(true);
  try {
    axios.get(`${process.env.REACT_APP_API_NOTES}?page=${page}`)
    .then(res => {
      model.insert(res.data.data)
      model.insertPages(res.data.meta)
    })
  } catch (err) {
    showToast(err.message, 'error-toast')
  } finally {
    setTimeout(model.setLoading, 100, false)
  }
};

function fetchSaveNotes(model, text) {
  model.setLoading(true);

  try {
    axios.post(`${process.env.REACT_APP_API_NOTES}/save`, { text })
    .then((res) => {
      if (res.data) {
        showToast('saved successfully')
        model.insert(res.data.data)
        model.insertPages(res.data.meta)
      }
    })
  } catch (err) {
    showToast(err.message, 'error-toast')
  } finally {
    setTimeout(model.setLoading, 100, false)
  }
}

function fetchCheckNote(model, id) {
  try {
    axios.get(`${process.env.REACT_APP_API_NOTES}/check?id=${id}`)
    .then((res) => {
      if (res.data) {
        showToast('saved successfully')
        model.updateChecked(res.data.id)
      }
    })
  } catch (err) {
    showToast(err.message, 'error-toast')
  }
}

export { fetchNotes, fetchSaveNotes, fetchCheckNote };