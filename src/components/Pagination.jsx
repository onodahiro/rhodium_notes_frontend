import React, { useState, useEffect } from 'react';
import { useUnit } from "effector-react";
import { fetchNotes, fetchNotesByTag } from '../api/noteApi.js';
import CButton from './utils/CButton.jsx';

function Pagination({ model }) {
  let { current_page, last_page } = useUnit(model.$pagination);
  let tag = useUnit(model.$tag);
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

  function handleFetchNotes(model, page) {
    if (tag) {
      fetchNotesByTag(model, tag.id, page)
    } else {
      fetchNotes(model, page);
    }
  }

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
        <CButton 
          text='<<<'
          disabled={isLastPage}
          clickFn={() => handleFetchNotes(model, last_page)} 
        />
        <CButton 
          text='<'
          disabled={isLastPage} 
          clickFn={() => handleFetchNotes(model, ++current_page)}
        />
        { 
          createPagesArray() ? (createPagesArray().map((number, index) => {
            return <CButton 
              key={index}
              text={number}
              className={'button-primary ' + (number === current_page ? 'p-active' : '')}
              clickFn={()=> current_page === +number ? false : handleFetchNotes(model, number)} 
            />
          })) : ''
        }
        <CButton 
          text='>' 
          disabled={isFirstPage} 
          clickFn={() => handleFetchNotes(model, --current_page)}
        />
        <CButton 
          text='>>>' 
          disabled={isFirstPage} 
          clickFn={() => handleFetchNotes(model, 1)}
        />
      </div>
    </>
  );
}

export default Pagination;