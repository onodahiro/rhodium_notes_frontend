import './App.css';
import TodoList from  './pages/TodoList.jsx';
import { createStore, createEvent, sample } from "effector";

// api 
import { saveNote } from './api/note.js';

function App() {

  function createTodoListApi(initial = []) {
    const insert = createEvent();
    const remove = createEvent();
    const change = createEvent();
    const search = createEvent();
    const filterTodo = createEvent();
    const reset = createEvent();
  
    const $input = createStore("");
    const $searchInput = createStore("");
    const $todos = createStore(initial);
    const $filteredTodos = createStore(initial);
  
    $input.on(change, (_, value) => value);
    $searchInput.on(search, (_, value) => value);
  

    // insert action
    $input.reset(insert);
    // $todos.on(insert, (todos, newTodo) => [...todos, newTodo]);
    $todos.on(insert, () => console.log(saveNote({text: 'test text'}), process.env.REACT_APP_API_NOTES));
    $filteredTodos.on(insert, () => $todos.getState());

    // filtered action
    $filteredTodos.on(filterTodo, (todos, val) =>   {
      const preTodos = $todos.getState();
      return preTodos ? preTodos.filter((el) => el.includes(val)) :  $todos.getState();
    });

    // remove action
    $todos.on(remove, (todos, index) => todos.filter((_, i) => i !== index));
    $filteredTodos.on(remove, () => $todos.getState());
    $input.reset(reset);
  
    const submit = createEvent();
    submit.watch((event) => event.preventDefault());
  
    sample({
      clock: submit,
      source: $input,
      target: insert,
    });

    sample({
      clock: search,
      source: $searchInput,
      target: filterTodo,
    });
  
    return {
      submit,
      remove,
      change,
      search,
      reset,
      $todos,
      $input,
      $searchInput,
      $filteredTodos
    };
  }
  
  const firstTodoList = createTodoListApi(["hello, world!"]);

  return (
    <div className="App">
      <TodoList label="First todo list" model={firstTodoList} />
    </div>
  );
}

export default App;
