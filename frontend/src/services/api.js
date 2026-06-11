import axios from 'axios';

const BASE_URL = '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getProfile = async () => {
  const res = await api.get('/profile');
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put('/profile', data);
  return res.data;
};

export default api;
