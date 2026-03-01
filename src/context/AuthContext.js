import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // 检查用户是否已登录
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await authAPI.getMe();
          setUser(response.data);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  // 登录
  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token: newToken, user: userData } = response;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      
      toast.success('登录成功！');
      return { success: true };
    } catch (error) {
      toast.error(error.message || '登录失败');
      return { success: false, error: error.message };
    }
  };

  // 注册
  const register = async (username, email, password) => {
    try {
      const response = await authAPI.register({ username, email, password });
      const { token: newToken, user: userData } = response;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      
      toast.success('注册成功！');
      return { success: true };
    } catch (error) {
      toast.error(error.message || '注册失败');
      return { success: false, error: error.message };
    }
  };

  // 登出
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('已退出登录');
  };

  // 更新用户信息
  const updateProfile = async (data) => {
    try {
      const response = await authAPI.updateProfile(data);
      setUser(response.data); // 后端返回的是 response.data
      toast.success('信息更新成功！');
      return { success: true };
    } catch (error) {
      toast.error(error.message || '更新失败');
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
