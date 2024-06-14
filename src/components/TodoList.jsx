import React, { useEffect } from 'react';
import { useUnit, useList } from "effector-react";

// api 
import { requestGetNotes, requestSaveNotes } from '../api/note.js';

function TodoList({ label, model }) {
  const isCancelled = React.useRef(false);
  const input = useUnit(model.$input);
  // const searchInput = useUnit(model.$searchInput);


  
  useEffect(() => {
    function fetchNotes() {
      requestGetNotes().then(res => {
          model.insert(res.data.data)
          model.insertPages(res.data.meta)
      })
    }

    if (!isCancelled.current) {
      fetchNotes();
    };
    return () => {
      isCancelled.current = true;
    };
  }, []);


  const todos = useList(model.$todos, (value, index) => (
    <li>
      {`№${value.id}.  ${value.text}`}
    </li>
  ));

  function insert() {
    requestSaveNotes({text: input}).then((res) => {
      model.insert(res.data.data)
      model.insertPages({links: res.data.links, meta: res.data.meta})
    })
  }

  return (
    <>
      <h1>{label}</h1>
      <form>
        <label>Insert: </label>
        <input
          type="text"
          value={input}
          onChange={(event) => model.change(event.currentTarget.value)}
          />
        <input type="button" onClick={insert} value="Save" />
        </form>
        {/* <form>
        <label>Search todo: </label>
        <input
          type="text"
          value={searchInput}
          onChange={(event) => model.search(event.currentTarget.value)}
          />
        { searchInput }
        </form> */}
      <ol>{todos}</ol>
    </>
  );
}

export default TodoList;