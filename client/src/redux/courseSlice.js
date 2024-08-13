import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    isLoading: false,
    error: null,
  },

  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.courses = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
    updateCourse: (state, action) => {
      const { _id, newData } = action.payload;
      const index = state.courses.findIndex((course) => course._id === _id);
      if (index !== -1) {
        state.courses[index] = { ...state.courses[index], ...newData };
      }
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  addCourse,
  deleteCourse,
  updateCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
