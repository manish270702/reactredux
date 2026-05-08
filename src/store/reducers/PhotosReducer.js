import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const PhotosReducer = createSlice({
  name: "photos",

  initialState,

  reducers: {
    setPhotoes: (state, action) => {
      state.value = [
        ...state.value,
        ...action.payload,
      ];
    },

    clearPhotos: (state) => {
      state.value = [];
    },
  },
});

export const { setPhotoes, clearPhotos } =
  PhotosReducer.actions;

export default PhotosReducer.reducer;