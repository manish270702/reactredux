import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const PhotoReducer = createSlice({
  name: "Photoes",

  initialState,

  reducers: {
    setPhotoes: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPhotoes } = PhotoReducer.actions;

export default PhotoReducer.reducer;