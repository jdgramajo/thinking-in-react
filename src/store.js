import { configureStore, createSlice } from "@reduxjs/toolkit";

// Redux Toolkit reducer definitions
// Each could go in their own file and export the actions,
// as the documentation suggests.

const inStockOnlySlice = createSlice({
  name: "inStockOnly",
  initialState: false,
  reducers: {
    toggleInStockOnly: (state) => !state,
  },
});

const { toggleInStockOnly } = inStockOnlySlice.actions;

const filterTextSlice = createSlice({
  name: "filterText",
  initialState: "",
  reducers: {
    changeFilterText: (state, action) => action.payload,
  },
});

const { changeFilterText } = filterTextSlice.actions;

export { toggleInStockOnly, changeFilterText };

// Global store configuration for Redux Toolkit.
// Could be in its own module.s

const store = configureStore({
  reducer: {
    [inStockOnlySlice.name]: inStockOnlySlice.reducer,
    [filterTextSlice.name]: filterTextSlice.reducer,
  },
});

export default store;
