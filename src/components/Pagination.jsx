import React, { useState, useEffect } from 'react';

import { useUnit } from "effector-react";

// Api
import { fetchNotes } from '../api/note.js';

function Pagination({ model }) {
  let { current_page, last_page } = useUnit(model.$pagination);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (current_page === last_page) {
      setIsLastPage(true);
      setIsFirstPage(false);
    } else if (current_page === 1) {
      setIsFirstPage(true);
      setIsLastPage(false);
    } else {
      setIsFirstPage(false);
      setIsLastPage(false);
    }
  }, [current_page, last_page]);

  const createPagesArray = () => {
    let pages = [];
    const lastPage = last_page;
    const isMobile = window.innerWidth < 768
    let maxPages = isMobile ? 3 : 5;


    const pagesViewed = lastPage > maxPages ? maxPages : lastPage;

    // добавить 2 в конец если надо
    if (current_page > 1) pages.unshift(current_page - 1);
    if ((current_page > 2) && !isMobile) pages.unshift(current_page - 2);

    // добавить среднюю
    pages.push(current_page);

    // добавить все оставшиеся в конец
    // возможное наличие последних страниц lastPage - current_page
    // Сколько еще добавленно в список pagesViewed - pages.length
    const lastPagesCount = (lastPage - current_page) > (pagesViewed - pages.length) ? pagesViewed - pages.length : lastPage - current_page
    if (lastPagesCount > 0) {
      pages = pages.concat(Array.from(new Array(lastPagesCount), (_, index) => index + 1 + current_page));
    } 

    // добавить все оставшиеся в начало
    if ((pagesViewed - pages.length) > 0) {
      pages = Array.from(new Array(pagesViewed - pages.length), (_, index) => {
        return pages[0] - (pagesViewed - pages.length) + index
      }).concat(pages);
    } 

    return pages.reverse();
  }

  return (
    <>
      <div className="pagination-container">
        <button disabled={isLastPage} className={isLastPage ? 'disabled' : ''} onClick={()=>fetchNotes(model, last_page)}>{'<<<'}</button>
        <button disabled={isLastPage} className={isLastPage ? 'disabled' : ''} onClick={()=>fetchNotes(model, ++current_page)}>{'<'}</button>
        { 
          createPagesArray() ? (createPagesArray().map((number, index) => {
            return <button 
              onClick={()=> current_page === +number ? false : fetchNotes(model, number)} 
              className={number === current_page ? 'active' : ''} key={index}
            >
              {number}
            </button>
          })) : ''
        }
        <button disabled={isFirstPage} className={isFirstPage ? 'disabled' : ''} onClick={()=>fetchNotes(model, --current_page)}>{'>'}</button>
        <button disabled={isFirstPage} className={isFirstPage ? 'disabled' : ''} onClick={()=>fetchNotes(model, 1)}>{'>>>'}</button>
      </div>
    </>
  );
}

export default Pagination;