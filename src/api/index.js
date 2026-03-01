import api from './axios';

// 认证 API
export const authAPI = {
  // 注册
  register: (data) => api.post('/auth/register', data),
  
  // 登录
  login: (data) => api.post('/auth/login', data),
  
  // 获取当前用户
  getMe: () => api.get('/auth/me'),
  
  // 更新用户信息
  updateProfile: (data) => api.put('/auth/update', data),
  
  // 修改密码
  updatePassword: (data) => api.put('/auth/password', data),
};

// 项目 API
export const projectAPI = {
  // 获取所有项目
  getProjects: (params) => api.get('/projects', { params }),
  
  // 获取精选项目
  getFeatured: () => api.get('/projects/featured'),
  
  // 获取单个项目
  getProject: (id) => api.get(`/projects/${id}`),
  
  // 创建项目
  createProject: (data) => api.post('/projects', data),
  
  // 更新项目
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  
  // 删除项目
  deleteProject: (id) => api.delete(`/projects/${id}`),
  
  // 点赞项目
  likeProject: (id) => api.post(`/projects/${id}/like`),
};
