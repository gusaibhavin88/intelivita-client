const interceptor = (api) => {
  // Request interceptor to add token to headers
  api.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle 401 error and redirect
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token is invalid or expired, handle token removal and redirect
        localStorage.clear(); // Clear token from localStorage
        window.location.href = "/signin"; // Redirect user to login page
      }

      return Promise.reject(error);
    }
  );
};

export default interceptor;
