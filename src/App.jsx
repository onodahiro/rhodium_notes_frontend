import './App.css';
import TodoList from  './components/TodoList.jsx';
import Pagination from  './components/Pagination.jsx';
import { createStore, createEvent } from "effector";



function App() {
  function createTodoListApi(initial = []) {
    const insert = createEvent();
    const insertPages = createEvent();
    const remove = createEvent();
    const change = createEvent();
    const reset = createEvent();

  
    const $input = createStore("");
    const $todos = createStore(initial);
    const $pagination = createStore({});

    $input.on(change, (_, value) => value);
    $input.reset(insert);
    $todos.on(insert, (_, notes) => notes)
    $pagination.on(insertPages, (_, pageData) => pageData)
  
    return {
      insert,
      remove,
      change,
      insertPages,
      reset,
      $todos,
      $pagination,
      $input,
    };
  }
  
  const notesStore = createTodoListApi();

  return (
    <div className="App">
      <TodoList label="First todo list" model={notesStore} />
      <Pagination model={notesStore} />
    </div>
  );
}

export default App;
