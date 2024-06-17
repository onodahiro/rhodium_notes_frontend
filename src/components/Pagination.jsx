import React from 'react';
import { useUnit } from "effector-react";

// Api
import { fetchNotes } from '../api/note.js';

function Pagination({ model }) {
  let { current_page, last_page } = useUnit(model.$pagination);
  
  const createPagesArray = () => {
    let pages = [];

    const lastPage = last_page;
    const pagesViewed = lastPage > 5 ? 5 : lastPage;

    // добавить 2 в начало если надо
    if (current_page > 1) pages.unshift(current_page - 1);
    if (current_page > 2) pages.unshift(current_page - 2);

    // добавить среднюю
    pages.push(current_page);

    // добавить все оставшиеся в конец
    // возможное наличие последних страниц lastPage - current_page
    // Сколько еще добавленно в список pagesViewed - pages.length
    const lastPagesCount = (lastPage - current_page) > (pagesViewed - pages.length) ? pagesViewed - pages.length : lastPage - current_page
    if (lastPagesCount) {
      pages = pages.concat(Array.from(new Array(lastPagesCount), (_, index) => index + 1 + current_page));
    } 

    // добавить все оставшиеся в начало
    if (pagesViewed - pages.length) {
      pages = Array.from(new Array(pagesViewed - pages.length), (_, index) => {
        return pages[0] - (pagesViewed - pages.length) + index
      }).concat(pages);
    } 

    return pages;
  }

  return (
    <>
      <div className="pagination-container">
        <button onClick={()=>fetchNotes(model, 1)}>{'<<<'}</button>
        <button disabled={current_page === 1} onClick={()=>fetchNotes(model, --current_page)}>{'<'}</button>
        { 
          createPagesArray() ? (createPagesArray().map((number, index) => {
            return <div style={ number === current_page ? {color: 'red'} : {color: 'green'}} key={index}> {number} </div>
          })) : ''
        }
        <button disabled={current_page === last_page} onClick={()=>fetchNotes(model, ++current_page )}>{'>'}</button>
        <button onClick={()=>fetchNotes(model, last_page)}>{'>>>'}</button>
      </div>
    </>
  );
}

export default Pagination;