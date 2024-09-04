import './App.scss';
import "toastify-js/src/toastify.css"
import NotesList from  './components/NotesList.jsx';
import Pagination from  './components/Pagination.jsx';
import createNotesStore from './store/NotesStore.js';


function App() {
  const notesStore = createNotesStore();
  console.log(
    `Weclome to react notes app !!!!
    ░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░
    ░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░
    ░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░
    ░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░
    ░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░
    █░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█
    █░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█
    ░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░
    ░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░
    ░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░
    ░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░
    ░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░
    ░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░
    ░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░
    ░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░░░░█░░`
  );

  return (
    <div className="App">
      <NotesList label="NOTES LIST" model={notesStore} />
      <Pagination model={notesStore} />
    </div>
  );
}

export default App;
