// src/api.js
import axios from 'axios';


const API_URL = 'http://192.168.0.6:3000/api'; // Your backend URL

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the token in the Authorization header
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
});

export const registerUser = async(userData) => {
  return await apiClient.post(`/auth/register`, userData);
};

export const loginUser = async(credentials) => {
//   return axios.post(`${API_URL}/auth/login`, credentials);
  const response = await apiClient.post(`/auth/login`,credentials, {
    headers: {
      'Content-Type': 'application/json',
      // You can add other headers here if needed
    },
  });
  return response;
};

export const saveDailyLog = async(logData) => {
    const response =  await apiClient.post(`/dailyLogs`, logData);
    return response;
};

export const getDailyLogs = async() => {
  return await apiClient.get(`/dailyLogs/`+localStorage.getItem('userId'));
};
