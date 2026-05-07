import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const VideoReducer = createSlice({
  name: "Videoes",

  initialState,

  reducers: {
    setvideoes: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setvideoes } = VideoReducer.actions;

export default VideoReducer.reducer;