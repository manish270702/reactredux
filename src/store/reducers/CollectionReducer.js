import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const CollectionReducer = createSlice({
  name: "collection",

  initialState,

  reducers: {
    setcollection: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setcollection } = CollectionReducer.actions;

export default CollectionReducer.reducer;