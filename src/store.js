import { createStore, combineReducers } from "redux";

const inStockOnly = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_IN_STOCK_ONLY":
      return !state;
    default:
      return state;
  }
};

const filterText = (state = "", action) => {
  switch (action.type) {
    case "FILTER_TEXT_CHANGE":
      return action.value;
    default:
      return state;
  }
};

const reducers = combineReducers({
  inStockOnly,
  filterText,
});

const store = createStore(reducers, {});

export default store;
