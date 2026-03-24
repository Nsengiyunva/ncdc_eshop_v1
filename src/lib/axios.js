import { API_URL } from "config";
import { useNotificationStore } from "stores/notifications";
import storage from "utils/storage";
import Axios from "axios";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

function authRequestInterceptor(config) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
}

authRequestInterceptor.propTypes = {
  config: PropTypes.any,
};

// Define Axios instance
export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);

// Handle request errors and add notification
function handleRequestError(error) {
  const message = error.response?.data?.message || error.message;
  useNotificationStore.getState().addNotification({
    type: "error",
    title: "Error",
    message,
  });

  if (error.response && error.response?.status === 401) {
    storage.clearToken();
    window.location.href = "/";
  }

  return Promise.reject(error);
}

// Intercept response and handle request errors
axios.interceptors.response.use(
  (response) => response.data,
  (error) => handleRequestError(error)
);

// Define a function to perform retries with exponential backoff
async function retryWithExponentialBackoff(config) {
  let retries = 3;
  let delay = 1000; // Initial delay in milliseconds

  while (retries > 0) {
    try {
      const response = await axios(config);
      return response; // Return the full response
    } catch (error) {
      if (error.response && error.response.status === 503) {
        // Handle 503 Service Unavailable error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The system is not connected to the internet!",
        });
        return handleRequestError(error);
      }

      // Retry on network errors or other errors
      // retries--;
      // if (retries === 0) {
      //   // No more retries left
      //   return handleRequestError(error);
      // }

      // Exponential backoff: increase delay exponentially with each retry
      const currentDelay = delay;
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      delay *= 2; // Double the delay for the next retry
    }
  }
}

// Example function to use the retry logic
export async function makeRequestWithRetries(config) {
  return retryWithExponentialBackoff(config);
}
