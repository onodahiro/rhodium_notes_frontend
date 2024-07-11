import { createStore, createEvent } from "effector";

const CSearchStore = (initial = []) => {
  const changeSearch = createEvent();
  const changeResults = createEvent();
  const changeLoading = createEvent();

  const $searchInput = createStore("").on(changeSearch, (_, val) => val);
  const $searchResults = createStore(initial).on(changeResults, (_, val) => val);
  const $searchLoading = createStore(false).on(changeLoading, (_, val) => val);

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