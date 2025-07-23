// src/services/authService.js
import axios from "../hooks/axiosConfig";

export const register = async (formData) => {
  const response = await axios.post(`api/auth/signup`, formData);

  // Save token to localStorage
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response;
};

export const login = async (email, password) => {
  const response = await axios.post(`api/auth/login`, {
    email,
    password,
  });
  return response;
};

export const verifyPassword = async (userId, password) => {
  const response = await axios.post(`api/auth/profile/verify-password`, {
    userId,
    password,
  });
  return response;
};

export const updateProfile = async (userId, formData) => {
  const response = await axios.put(`api/auth/profile/${userId}`, formData);
  return response;
};
