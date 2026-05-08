import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const VideoReducer = createSlice({
  name: "Videoes",

  initialState,

  reducers: {
    // append new videos
    setvideoes: (state, action) => {
      state.value = [
        ...state.value,
        ...action.payload,
      ];
    },

    // clear old videos
    clearvideoes: (state) => {
      state.value = [];
    },
  },
});

export const {
  setvideoes,
  clearvideoes,
} = VideoReducer.actions;

export default VideoReducer.reducer;