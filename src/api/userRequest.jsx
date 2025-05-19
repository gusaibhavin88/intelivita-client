import axios from "axios";
import interceptor from "./interceptor";
const apiUrl = import.meta.env.VITE_BASE_URL;

const baseURL = `${apiUrl}/api/v1/`;

const api = axios.create({
  baseURL,
});
interceptor(api);

export const getUserProfile = () => api.get("/admin/get-profile");
export const updateUserProfile = (formData) =>
  api.put("/admin/update-user", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
