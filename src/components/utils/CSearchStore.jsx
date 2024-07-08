import { createStore, createEvent } from "effector";

const CSearchStore = (initial = []) => {
  const $searchInput = createStore("")
  const $searchLoading = createStore(false)
  const $searchResults = createStore(initial)
  
  const changeSearch = createEvent();
  const changeResults = createEvent();
  const changeLoading = createEvent();
  $searchInput.on(changeSearch, (_, val) => val);
  $searchResults.on(changeResults, (_, val) => val);
  $searchLoading.on(changeLoading, (_, val) => val);

  return {
    $searchInput,
    $searchResults,
    $searchLoading,
    changeSearch,
    changeResults,
    changeLoading,
  }
}

export default CSearchStore;