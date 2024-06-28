import './App.css';
import "toastify-js/src/toastify.css"
import TodoList from  './components/TodoList.jsx';
import Pagination from  './components/Pagination.jsx';
import { createStore, createEvent } from "effector";



function App() {
  function createTodoListApi(initial = []) {
    const insert = createEvent();
    const insertPages = createEvent();
    const remove = createEvent();
    const change = createEvent();
    const changeSearch = createEvent();
    const reset = createEvent();
    const setLoading = createEvent();
    const updateChecked = createEvent();

  
    const $input = createStore("");
    const $searchInput = createStore("");
    const $notes = createStore(initial);
    const $loading = createStore(true);
    const $pagination = createStore({});

    $input.on(change, (_, val) => val);
    $searchInput.on(changeSearch, (_, val) => val);
    $notes.on(insert, (_, val) => val);
    $loading.on(setLoading, (_, val) => val);
    $pagination.on(insertPages, (_, val) => val);
    $input.reset(insert);
    
    $notes.on(updateChecked, (list, id) =>  
      list.map((el) => ({
        ...el,
        checked: +id === el.id ? !el.checked : el.checked,
      }))
    )

    return {
      insert,
      remove,
      change,
      changeSearch,
      insertPages,
      reset,
      setLoading,
      updateChecked,
      $notes,
      $pagination,
      $input,
      $searchInput,
      $loading
    };
  }
  
  const notesStore = createTodoListApi();

  return (
    <div className="App">
      <TodoList label="LIST" model={notesStore} />
      <Pagination model={notesStore} />
    </div>
  );
}

export default App;
