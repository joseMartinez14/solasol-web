import axios from 'axios';

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('firebaseAuthToken');
}

const api = axios.create({
  //baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'http://localhost:3001/api/',
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
  }
});
export default api;
