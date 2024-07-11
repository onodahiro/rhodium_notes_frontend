import { createStore, createEvent } from "effector";

const createNotesStore = (initial = []) => {
  const insert = createEvent();
  const setPages = createEvent();
  const remove = createEvent();
  const change = createEvent();
  const changeSearch = createEvent();
  const changeTag = createEvent();
  const reset = createEvent();
  const setLoading = createEvent();
  const updateChecked = createEvent();

  const $input = createStore("").on(change, (_, val) => val);
  const $tag = createStore("").on(changeTag, (_, val) => val);
  const $searchInput = createStore("").on(changeSearch, (_, val) => val);
  const $notes = createStore(initial).on(insert, (_, val) => val);
  const $loading = createStore(true).on(setLoading, (_, val) => val);
  const $pagination = createStore({}).on(setPages, (_, val) => val);

  $input.reset(insert);
  
  $notes.on(updateChecked, (list, id) =>  
    list.map((el) => ({
      ...el,
      checked: +id === el.id ? !el.checked : el.checked,
    }))
  );

  return {
    insert,
    remove,
    change,
    changeSearch,
    setPages,
    reset,
    setLoading,
    updateChecked,
    changeTag,
    $notes,
    $pagination,
    $input,
    $searchInput,
    $loading,
    $tag,
  };
}

export default createNotesStore;