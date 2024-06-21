import React, { memo, useEffect, useRef } from 'react';
import { useUnit, useList } from "effector-react";

import PuffLoader from "react-spinners/PuffLoader";

// api 
import { fetchNotes, fetchSaveNotes, fetchCheckNote } from '../api/note.js';


const TodoList = memo(function ({ label, model }) {
  const isCancelled = useRef(false);
  const input = useUnit(model.$input);
  const [notes] = useUnit(model.$notes);
  const [loading] = useUnit([model.$loading]);

  useEffect(() => {
    if (!isCancelled.current) {
      fetchNotes(model);
    };
    return () => {
      isCancelled.current = true;
    };
  }, [model]);
  
  const notesList = useList(model.$notes, (value) => {
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
        <div className='form-save'>
          <input
            type="text"
            value={input}
            onChange={(event) => model.change(event.currentTarget.value)}
            />
          <input type="button" onClick={() => fetchSaveNotes(model, input)} value="Save" />
        </div>
      </form>
        <div className='notes-container'>
          {
            loading ? 
              <PuffLoader color="#4e8efb" /> : 
              notes ? 
                <ol className='notes-list'>{notesList}</ol> : 
                'empty list ...'
          }
        </div>
    </>
  );
})

export default TodoList;