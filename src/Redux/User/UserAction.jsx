import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, updateUserProfile } from "../../api/userRequest";

// Get Profile
export const getProfileAction = createAsyncThunk(
  "getProfileAction",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    try {
      const response = await getUserProfile(formData);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);

// Update user profile
export const updateProfileAction = createAsyncThunk(
  "updateProfileAction",
  async ({ functions }, { dispatch }) => {
    const { onComplete, onError, formData } = functions;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await updateUserProfile(formData, config);
      onComplete(response);
      return response;
    } catch (error) {
      onError(error.response);
      throw error.response.data;
    }
  }
);
