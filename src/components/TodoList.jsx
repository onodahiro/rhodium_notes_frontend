import React, { memo, useEffect, useRef } from 'react';
import { useUnit, useList } from "effector-react";

import PuffLoader from "react-spinners/PuffLoader";

// api 
import { fetchNotes, fetchSaveNotes, fetchCheckNote, fetchPreloadTags } from '../api/noteApi.js';
import useDebounce from './utils/debouce.jsx';
import CSearch from './utils/CSearch.jsx';
import  CSearchStore   from './utils/CSearchStore.jsx';

const TodoList = memo(function ({ label, model }) {
  const isCancelled = useRef(false);
  const input = useUnit(model.$input);
  const searchInput = useUnit(model.$searchInput);
  const [notes] = useUnit(model.$notes);
  const [loading] = useUnit([model.$loading]);


  const inputStore = CSearchStore();
  console.log('rerender');

  useEffect(() => {
    if (!isCancelled.current) {
      console.log('fetch notes');
      fetchNotes(model);
    };
    return () => {
      isCancelled.current = true;
    };
  }, []);

  const debouncedSearchTerm = useDebounce(searchInput, 200);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        console.log(isCancelled.current);
        model.setLoading(true);
        // searchNotes(model, debouncedSearchTerm)
      } else {
        // пустой результат
      }
    },
    [debouncedSearchTerm]
  );

  const notesList = useList(model.$notes, (el) => {
    const computedChecked = {
        textDecoration: el.checked ? 'line-through' : 'none',
    };

    return <>
      <li className='note-container'>
        <div className='note-text'>
          <input type='checkbox' onChange={()=>fetchCheckNote(model, el.id)} checked={el.checked}></input>
          <span style={computedChecked}>{`№${el.id}.  ${el.text}`}</span>
        </div>
        <div className='note-desc'>
          <div className='note-tags'>
            {
              el.tags.map((el, index) => {
                return <span className='note-tags__tag' key={index}>{`#${el}`}</span>
              })
            }
          </div>
          <span className='span-secondary'>{ el.date_created }</span>
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
          <CSearch model={inputStore} searchFn={fetchPreloadTags} placeholder="Search tags"/>
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