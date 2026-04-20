import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token, ...userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      const message = error.response?.data || error.message || 'Login failed';
      return { success: false, message: message === 'Network Error' ? 'Cannot connect to Server. Is backend running?' : message };
    }
  };

  const register = async (username, password, fullName, role) => {
    try {
      await api.post('/auth/register', { username, password, fullName, role });
      return { success: true };
    } catch (error) {
      const message = error.response?.data || error.message || 'Registration failed';
      return { success: false, message: message === 'Network Error' ? 'Cannot connect to Server. Is backend running?' : message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
