import axios, { AxiosError } from "axios";

import "firebase/auth";
import firebase_app from "../firebase/config";
import { getAuth, getIdToken } from "firebase/auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //baseURL: 'http://localhost:3001/api/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem("firebaseAuthToken")}`,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("firebaseAuthToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      // Token has expired, refresh it
      //const accessToken = await refreshToken();
      const user = getAuth(firebase_app).currentUser;

      if (user) {
        const accessToken = await getIdToken(user, true);

        if (accessToken) {
          // Retry the original request with the new token
          console.log("Retrying to get the information after a 401 error code");
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          localStorage.setItem("access_token", accessToken);
          axios.defaults.headers.Authirization = `Bearer ${accessToken}`;
          return axios(error.config);
        } else {
        }
      }
    }
    throw new AxiosError(error);
  }
);

export default api;
