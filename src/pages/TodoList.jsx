import { useUnit, useList } from "effector-react";

function TodoList({ label, model }) {
  const input = useUnit(model.$input);
  const searchInput = useUnit(model.$searchInput);

  const todos = useList(model.$filteredTodos, (value, index) => (
    <li>
      {value}{" "}
      <button type="button" onClick={() => model.remove(index)}>
        Remove
      </button>
    </li>
  ));

  return (
    <>
      <h1>{label}</h1>
      <form>
        <label>Insert todo: </label>
        <input
          type="text"
          value={input}
          onChange={(event) => model.change(event.currentTarget.value)}
          />
        <input type="submit" onClick={model.submit} value="Insert" />
        </form>
        <form>
        <label>Search todo: </label>
        <input
          type="text"
          value={searchInput}
          onChange={(event) => model.search(event.currentTarget.value)}
          />
        { searchInput }
        </form>
      <ol>{todos}</ol>
    </>
  );
}

export default TodoList;