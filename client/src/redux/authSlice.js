import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },

    updateUser: (state, action) => {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload };
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },

    updatePurchasedCourses: (state, action) => {
      if (state.userInfo) {
        state.userInfo.purchasedCourses = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },

    updateQuizResults: (state, action) => {
      if (state.userInfo) {
        state.userInfo.quizResults = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
  },
});

export const {
  setCredentials,
  logout,
  updateUser,
  updatePurchasedCourses,
  updateQuizResults,
} = authSlice.actions;

export default authSlice.reducer;
