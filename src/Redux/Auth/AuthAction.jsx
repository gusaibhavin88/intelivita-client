import { createAsyncThunk } from "@reduxjs/toolkit";
import { logInUser, registerUser } from "../../api/AuthRequest";

// User  login
export const loginUserAction = createAsyncThunk(
  "loginUserAction",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const response = await logInUser(formData);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// User  Sign Up
export const signupUserAction = createAsyncThunk(
  "signupUserAction",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await registerUser(formData, config);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
