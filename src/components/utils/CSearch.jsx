import React, { useRef, useState, useEffect, memo } from 'react';
import { useUnit, useList } from "effector-react";

import PuffLoader from "react-spinners/PuffLoader";

import useDebounce from './debouce.jsx';

const CSearch = memo(({ model, searchFn, placeholder }) => {
  const searchInput  = useUnit(model.$searchInput);
  const loading  = useUnit(model.$searchLoading);
  const [ searchResults ] = useUnit(model.$searchResults);
  const [isShowResults, setIsShowResults] = useState(false);
  const DSearchInput = useDebounce(searchInput, 300);
  const wrapperRef = useRef(null);
  useOutsideShow(wrapperRef);

  const handleInput = (val) => {
    if (!searchResults) {
      model.changeLoading(true);
    }
    model.changeSearch(val);
  }

  useEffect(
    () => {
      if (DSearchInput) {
        searchFn(model, DSearchInput);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [DSearchInput]
  );

  function useOutsideShow(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsShowResults(false);
        } else {
          if (!searchInput.trim()) setIsShowResults(true);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const resultsList = useList(model.$searchResults, (el) => {
    return <>
    <div className='csearch-item-wrapper'>
      <li key={el.id}>
        {el.text}
      </li>
    </div>
    </>
  });

  return (
    <>
      <div className="csearch-container" ref={wrapperRef}>
        <input
          type="text"
          className={"csearch " + (isShowResults && searchInput.trim() ? "csearch-active" : "")}
          value={searchInput}
          placeholder={placeholder}
          onChange={(event) => handleInput(event.currentTarget.value)}
        />
        { 
          !isShowResults || !searchInput.trim() ? '' :
            loading ? 
            <div className="csearch-loader">
              <PuffLoader size={20}  color="#4e8efb" />
            </div> :
            searchResults ? 
              <ol>{resultsList}</ol> :
                <ol>
                  <li className="csearch-not-found">
                    {'tags not found'}
                  </li>
                </ol>  
        }
      </div>
    </>
  );
})

export default CSearch;