import axios from 'axios';

function fetchNotes(model, page = 1) {
  try {
    axios.get(`${process.env.REACT_APP_API_NOTES}?page=${page}`)
    .then(res => {
      model.insert(res.data.data)
      model.insertPages(res.data.meta)
    })
  } catch (err) {
    console.log(err);
  }
};

function fetchSaveNotes(model, text) {
  try {
    axios.post(`${process.env.REACT_APP_API_NOTES}/save`, { text })
    .then((res) => {
      model.insert(res.data.data)
      model.insertPages(res.data.meta)
    })
  } catch (err) {
    console.log(err);
  }
}

function fetchCheckNote(model, id) {
  try {
    axios.get(`${process.env.REACT_APP_API_NOTES}/check?id=${id}`)
    .then((res) => {
      model.insert(res.data.data)
      model.insertPages(res.data.meta)
    })
  } catch (err) {
    console.log(err);
  }
}

export { fetchNotes, fetchSaveNotes, fetchCheckNote };