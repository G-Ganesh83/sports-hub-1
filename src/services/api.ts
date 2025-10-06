import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // Expects: { user_name, user_email, password, role? }
  register: (data: { user_name: string; user_email: string; password: string; role?: string }) =>
    api.post('/auth/register', data),
  
  // Expects: { user_name? , user_email?, password }
  login: (data: { user_name?: string; user_email?: string; password: string }) =>
    api.post('/auth/login', data),
  
  getMe: () => api.get('/auth/me'),
};

// Player API
export const playerAPI = {
  createOrUpdateProfile: (data: any) => api.post('/players', data),
  getPlayers: (params?: { page?: number; limit?: number; sport?: string }) =>
    api.get('/players', { params }),
  getPlayer: (id: string) => api.get(`/players/${id}`),
};

// Event API
export const eventAPI = {
  createEvent: (data: any) => api.post('/events', data),
  getMyEvents: () => api.get('/events'),
  updateEvent: (id: string, data: any) => api.put(`/events/${id}`, data),
  deleteEvent: (id: string) => api.delete(`/events/${id}`),
};

// Engagement API
export const engagementAPI = {
  likeTarget: (data: { targetType: 'player' | 'event'; targetId: string }) =>
    api.post('/engagements/like', data),
  commentTarget: (data: { targetType: 'player' | 'event'; targetId: string; text: string }) =>
    api.post('/engagements/comment', data),
  followPlayer: (data: { playerId: string }) =>
    api.post('/engagements/follow', data),
};

export default api;
 
// Users API
export const usersAPI = {
  updateMe: (data: any) => api.put('/auth/update', data),
  getMe: () => api.get('/auth/me'),
};
