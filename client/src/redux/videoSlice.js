import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [],
    isLoading: false,
    error: null,
  },

  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.videos = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    addVideo: (state, action) => {
      state.videos.push(action.payload);
    },
    deleteVideo: (state, action) => {
      state.videos = state.videos.filter(
        (video) => video.id !== action.payload
      );
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, addVideo, deleteVideo } =
  videoSlice.actions;
export default videoSlice.reducer;
