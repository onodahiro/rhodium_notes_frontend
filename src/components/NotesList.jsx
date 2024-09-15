import React, { memo, useEffect, useRef } from 'react';
import { useUnit, useList } from "effector-react";

// api 
import { fetchNotes, fetchSaveNotes, fetchCheckNote, fetchPreloadTags, fetchNotesByTag } from '../api/noteApi.js';
import CSearch from './utils/CSearch.jsx';
import CButton from './utils/CButton.jsx';
import  CSearchStore   from '../store/utils/CSearchStore.js';

const TodoList = memo(function ({ label, model }) {
  const isCancelled = useRef(false);
  const input = useUnit(model.$input);
  const tag = useUnit(model.$tag);
  const [notes] = useUnit(model.$notes);

  const inputStore = CSearchStore();

  useEffect(() => {
    if (!isCancelled.current)  fetchNotes(model);
    return () => {
      isCancelled.current = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function filterNotes(val) {
    if (val) {
      fetchNotesByTag(model, val.id)
      model.changeTag(val)
    } else {
      fetchNotes(model)
      model.changeTag(null)
    }
  }

  const notesList = useList(model.$notes, (el) => {
    const computedChecked = {
        textDecoration: el.checked ? 'line-through' : 'none',
    };
    let id = el.id ? `№${el.id}.` : '...';

    return <>
      <li className='note-container'>
        <div className='note-text'>
          <input type='checkbox' onChange={()=>fetchCheckNote(model, el.id)} checked={el.checked}></input>
          <span style={computedChecked}>{`${id}  ${el.text}`}</span>
        </div>
        <div className='note-desc'>
          <div className='note-tags'>
            {
              el.tags.map((el) => {
                return <span 
                  key={el.id}
                  onClick={() => filterNotes(el)}
                  className='note-tags__tag'
                  >
                  {`#${el.text}`}
                </span>
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
      <div className='form-container'>
        <div className='form-save'>
          <div className='form-text-block'>
            <input
              type="text"
              placeholder="Note text"
              value={input}
              onChange={(event) => model.change(event.currentTarget.value)}
              onKeyDown={(e) => {if (e.key === "Enter") fetchSaveNotes(model, input)}}
            />
            <CButton
              text='Save'
              clickFn={() => fetchSaveNotes(model, input)}
            />
          </div>
          {tag ? <>
            <div>
              <span>Filtered by: #{tag.text}</span> 
              <CButton
                text='X'
                clickFn={() => filterNotes(null)} >
              </CButton>
            </div>
          </>
          : <CSearch model={inputStore} searchFn={fetchPreloadTags} pickFn={filterNotes} placeholder="Search tags"/>
          }
        </div>
      </div>
        <div className='notes-container'>
          {
              notes ? 
                <ol className='notes-list'>{notesList}</ol> :
                'empty list ...'
          }
        </div>
    </>
  );
})

export default TodoList;