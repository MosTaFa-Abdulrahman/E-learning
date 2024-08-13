import { createSlice } from "@reduxjs/toolkit";

export const sectionSlice = createSlice({
  name: "section",
  initialState: {
    sections: [],
    status: "idle",
    error: null,
  },

  reducers: {
    fetchStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.status = "succeeded";
      state.sections = action.payload;
    },
    fetchFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    addSection: (state, action) => {
      state.sections.push(action.payload);
    },
    deleteSection: (state, action) => {
      state.sections = state.sections.filter(
        (section) => section.id !== action.payload
      );
    },
  },
});

export const {
  addSection,
  deleteSection,
  fetchStart,
  fetchSuccess,
  fetchFailure,
} = sectionSlice.actions;
export default sectionSlice.reducer;
