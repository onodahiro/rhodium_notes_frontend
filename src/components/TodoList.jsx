import React, { useEffect } from 'react';
import { useUnit, useList } from "effector-react";

// api 
import { requestGetNotes, requestSaveNotes } from '../api/note.js';

function TodoList({ label, model }) {
  const isCancelled = React.useRef(false);
  const input = useUnit(model.$input);

  function checkNote(id) {
    console.log(id);
  }
  
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

  

  const todos = useList(model.$todos, (value) => {
    const computedChecked = {
        textDecoration: value.checked ? 'line-through' : 'none',
    };

    return <>
      <div className='noteItem'>
        <input type='checkbox' onChange={()=>checkNote(value.id)} checked={value.checked}></input>
        <li style={computedChecked}>
          {`№${value.id}.  ${value.text}`}
        </li>
      </div>
    </>
  });

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
      <ol className='notes-list'>{todos}</ol>
    </>
  );
}

export default TodoList;