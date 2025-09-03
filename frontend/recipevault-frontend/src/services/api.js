import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid, clear it and redirect to login
      clearToken();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// Token management functions
export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const clearToken = () => {
  localStorage.removeItem('token');
};

export const authAPI = {
  login: (email, password) => api.post('/auth/signin', { email, password }),
  signup: (userData) => api.post('/auth/signup', userData),
};

export const userAPI = {
  getProfile: () => api.get('/api/users/profile'),
};

export const recipesAPI = {
  getAll: () => api.get('/api/recipes'),
  create: (recipeData) => api.post('/api/recipes', recipeData),
  update: (id, recipeData) => api.put(`/api/recipes/${id}`, recipeData),
  delete: (id) => api.delete(`/api/recipes/${id}`),
  like: (id) => api.put(`/api/recipes/${id}/like`),
};

export default api;