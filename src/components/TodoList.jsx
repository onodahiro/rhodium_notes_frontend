import React, { useEffect } from 'react';
import { useUnit, useList } from "effector-react";

// api 
import { fetchNotes, fetchSaveNotes, fetchCheckNote } from '../api/note.js';

function TodoList({ label, model }) {
  const isCancelled = React.useRef(false);
  const input = useUnit(model.$input);

  useEffect(() => {
    if (!isCancelled.current) {
      fetchNotes(model);
    };
    return () => {
      isCancelled.current = true;
    };
  }, [model]);

  

  const todos = useList(model.$todos, (value) => {
    const computedChecked = {
        textDecoration: value.checked ? 'line-through' : 'none',
    };

    return <>
      <div className='noteItem'>
        <input type='checkbox' onChange={()=>fetchCheckNote(model, value.id)} checked={value.checked}></input>
        <li style={computedChecked}>
          {`№${value.id}.  ${value.text}`}
        </li>
      </div>
    </>
  });

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
        <input type="button" onClick={() => fetchSaveNotes(model, input)} value="Save" />
        </form>
      <ol className='notes-list'>{todos}</ol>
    </>
  );
}

export default TodoList;