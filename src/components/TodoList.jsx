import React, { memo, useEffect, useRef, useState } from 'react';
import { useUnit, useList } from "effector-react";

import PuffLoader from "react-spinners/PuffLoader";

// api 
import { fetchNotes, fetchSaveNotes, fetchCheckNote, searchNotes } from '../api/noteApi.js';
import useDebounce from './utils/debouce.jsx';

const TodoList = memo(function ({ label, model }) {
  const isCancelled = useRef(false);
  const input = useUnit(model.$input);
  const searchInput = useUnit(model.$searchInput);
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

  const debouncedSearchTerm = useDebounce(searchInput, 400);

  useEffect(
    () => {
      model.setLoading(true);
        // Сделать запрос к АПИ
        console.log('debouncedSearchTerm', debouncedSearchTerm);
        searchNotes(model, debouncedSearchTerm)
    },
    [debouncedSearchTerm]
  );

  const notesList = useList(model.$notes, (value) => {
    const computedChecked = {
        textDecoration: value.checked ? 'line-through' : 'none',
    };

    return <>
      <li className='note-container'>
        <div className='note-text'>
          <input type='checkbox' onChange={()=>fetchCheckNote(model, value.id)} checked={value.checked}></input>
          <span style={computedChecked}>{`№${value.id}.  ${value.text}`}</span>
        </div>
        <div className='note-desc'>
          <div className='note-tags'>
            {
              value.tags.map((el, index) => {
                return <span className='note-tags__tag' key={index}>{`#${el}`}</span>
              })
            }
          </div>
          <span className='span-secondary'>{ value.date_created }</span>
        </div>
      </li>
    </>
  });

  return (
    <>
      <h1>{label}</h1>
      <form>
        <div className='form-save'>
          <input
            type="text"
            placeholder="Note text"
            value={input}
            onChange={(event) => model.change(event.currentTarget.value)}
            onKeyDown={(e) => {if (e.key === "Enter") fetchSaveNotes(model, input)}}
            />
          <input 
            type="button"
            onClick={() => fetchSaveNotes(model, input)}
            value="Save"
          />
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(event) => model.changeSearch(event.currentTarget.value)}
            />
        </div>
      </form>
        <div className='notes-container'>
          {
            loading ? 
              <PuffLoader color="#4e8efb" /> : 
              notes ? 
                <ol className='notes-list'>{notesList.reverse()}</ol> : 
                'empty list ...'
          }
        </div>
    </>
  );
})

export default TodoList;