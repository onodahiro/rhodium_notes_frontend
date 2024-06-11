import './App.css';
import TodoList from  './pages/TodoList.jsx';
import { createStore, createEvent, sample } from "effector";



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

    // todo paginationn
    // const $pagintion = createStore({
    //   current: 1,
    //   max: 1,

    // });
  
    $input.on(change, (_, value) => value);
    $searchInput.on(search, (_, value) => value);
  

    // insert action
    $input.reset(insert);
    $todos.on(insert, (_, notes) => notes)
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
  

    sample({
      clock: search,
      source: $searchInput,
      target: filterTodo,
    });
  
    return {
      insert,
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
  
  const firstTodoList = createTodoListApi();

  return (
    <div className="App">
      <TodoList label="First todo list" model={firstTodoList} />
    </div>
  );
}

export default App;
