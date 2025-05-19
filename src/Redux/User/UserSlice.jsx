import { createSlice } from "@reduxjs/toolkit";
import { getProfileAction, updateProfileAction } from "./UserAction";

// Define the initial state
const initialState = {
  loading: false,
};

// Create a slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getProfileAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProfileAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
export const { logOut } = userSlice.actions;
