import { combineReducers } from "@reduxjs/toolkit";
import authSliceReducer from "./Auth/AuthSlice";
import userSliceReducer from "./User/UserSlice";

const combinedReducer = combineReducers({
  auth: authSliceReducer,
  user: userSliceReducer,
});

export const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};
