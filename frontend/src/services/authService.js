// src/services/authService.js
import api from '../libs/axios';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/sign-in', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi không xác định' };
  }
};

export const checkAuth = async () => {
  try {
    const response = await api.get('/auth/check-auth');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi không xác định' };
  }
}

export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Lỗi không xác định' };
  }
}