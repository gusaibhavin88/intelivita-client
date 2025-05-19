import { createSlice } from "@reduxjs/toolkit";
import { loginUserAction, signupUserAction } from "./AuthAction";

// Define the initial state
const initialState = {
  userData: {},
  loading: false,
};

// Create a slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.userData = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data.data.user;
        localStorage.setItem(
          "token",
          JSON.stringify(action.payload.data.data.token)
        );
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(signupUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data.data;
      })
      .addCase(signupUserAction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
export const { logOut, getProfile } = authSlice.actions; // Export the clearError action
