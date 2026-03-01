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

// GitHub API
export const githubAPI = {
  // 获取用户信息
  getUser: (username) => api.get(`/github/user/${username}`),
  
  // 获取用户仓库
  getRepos: (username, params) => api.get(`/github/repos/${username}`, { params }),
  
  // 搜索仓库
  searchRepos: (query, params) => api.get('/github/search', { params: { q: query, ...params } }),
  
  // 获取推荐仓库
  getRecommended: (username, params) => api.get(`/github/recommended/${username}`, { params }),
  
  // 同步 GitHub 项目
  syncProjects: (username, data) => api.post(`/github/sync/${username}`, data),
  
  // 导入单个仓库
  importRepo: (data) => api.post('/github/import', data),
};

// 图库 API
export const imageAPI = {
  // 上传图片
  uploadImage: (formData) => {
    return api.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // 获取所有图片
  getImages: (params) => api.get('/images', { params }),
  
  // 获取单个图片
  getImage: (id) => api.get(`/images/${id}`),
  
  // 更新图片信息
  updateImage: (id, data) => api.put(`/images/${id}`, data),
  
  // 删除图片
  deleteImage: (id) => api.delete(`/images/${id}`),
  
  // 按分类获取图片
  getImagesByCategory: (category, params) => api.get(`/images/category/${category}`, { params }),
};

// 配置 API
export const configAPI = {
  // 获取配置
  getConfig: (key) => api.get(`/config/${key}`),
  
  // 获取所有配置
  getAllConfigs: (params) => api.get('/config', { params }),
  
  // 获取公开配置
  getPublicConfigs: () => api.get('/config/public/all'),
  
  // 设置配置
  setConfig: (data) => api.post('/config', data),
  
  // 删除配置
  deleteConfig: (key) => api.delete(`/config/${key}`),
};
