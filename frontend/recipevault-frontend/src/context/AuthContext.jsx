import React, { createContext, useState, useContext, useEffect } from 'react';
import { userAPI, getToken, clearToken, setToken } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(''); // Removed loading state from here

  // Check for existing token on app load
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUser(response.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch user profile', err);
      clearToken();
      setUser(null);
      setError('Session expired. Please login again.');
    }
  };

  const login = (userData, token) => {
    setToken(token);
    setUser(userData);
    setError('');
  };

  const logout = () => {
    clearToken();
    setUser(null);
    setError('');
  };

  const value = {
    user,
    error,
    setError,
    login,
    logout,
    fetchUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};