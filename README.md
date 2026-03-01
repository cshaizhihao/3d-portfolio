# 🚀 3D Portfolio - 个人展示网站

> 基于 React + Three.js 的赛博朋克风格个人作品展示平台

## 📋 项目概述

这是一个展示个人风格和项目作品的 3D 交互式网站，采用赛博朋克视觉风格，支持后端管理和多种自定义功能。

## ✨ 核心特性

### 当前已实现
- ✅ 3D 交互场景（Three.js + React Three Fiber）
- ✅ 响应式设计（桌面端 + 移动端适配）
- ✅ 赛博朋克配色（霓虹绿 #00ff88 主题）
- ✅ 移动端触摸优化（单指旋转、双指缩放）
- ✅ WebGL 检测和降级处理

### 🚧 开发中
- 🔨 后端 API 服务（Node.js + Express）
- 🔨 用户认证系统（JWT）
- 🔨 管理控制台
- 🔨 项目展示模块
- 🔨 GitHub 搜索推荐功能

### 📅 计划中
- 📝 数据库集成（MongoDB/PostgreSQL）
- 📝 文件上传功能
- 📝 实时数据更新
- 📝 SEO 优化
- 📝 Docker 容器化部署

## 🎨 设计风格

**赛博朋克主题色**
- 主色：霓虹绿 `#00ff88`
- 辅色：电蓝 `#0088ff`、粉红 `#ff0088`、紫色 `#8800ff`
- 背景：纯黑 `#000`
- 特效：发光阴影、模糊背景、渐变按钮

## 🛠️ 技术栈

### 前端
- **框架**: React 19.2.4
- **3D 渲染**: Three.js 0.183.2
- **React 集成**: @react-three/fiber + @react-three/drei
- **构建工具**: Create React App

### 后端（规划中）
- **运行时**: Node.js
- **框架**: Express.js
- **认证**: JWT + bcrypt
- **数据库**: MongoDB / PostgreSQL
- **API**: RESTful / GraphQL

### 部署
- **目标**: VPS 自托管（指定端口）
- **容器化**: Docker + Docker Compose
- **反向代理**: Nginx
- **进程管理**: PM2

## 📂 项目结构

```
3d-portfolio/
├── public/              # 静态资源
├── src/
│   ├── App.js          # 主应用组件
│   ├── App.css         # 全局样式
│   └── index.js        # 入口文件
├── server/             # 后端服务（待创建）
│   ├── routes/         # API 路由
│   ├── models/         # 数据模型
│   ├── middleware/     # 中间件
│   └── config/         # 配置文件
└── package.json
```

## 🚀 快速开始

### 前端开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建生产版本
npm run build
```

### 后端开发（待实现）

```bash
# 进入后端目录
cd server

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 📦 部署指南

### VPS 部署步骤

1. **构建前端**
   ```bash
   npm run build
   ```

2. **配置后端**（待实现）
   ```bash
   cd server
   npm install --production
   ```

3. **使用 PM2 启动**
   ```bash
   pm2 start server/index.js --name 3d-portfolio
   ```

4. **Nginx 反向代理**
   ```nginx
   location /portfolio {
       proxy_pass http://localhost:YOUR_PORT;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```

## 🎯 已有项目展示

本网站将展示以下项目：

- **Komari探针** - [www.zze.cc](http://www.zze.cc)
- **剩余价值计算器** - [syjz.zze.cc](http://syjz.zze.cc)
- **公共图床** - [tuchuang.zze.cc](http://tuchuang.zze.cc)

## 🗺️ 开发路线图

### Phase 1: 前端完善 ✅
- [x] 基础 3D 场景
- [x] 响应式布局
- [x] 移动端优化
- [ ] 赛博朋克 UI 组件库
- [ ] 项目展示卡片
- [ ] 页面路由

### Phase 2: 后端开发 🚧
- [ ] Express 服务器搭建
- [ ] 用户认证系统
- [ ] 管理员控制台
- [ ] RESTful API
- [ ] 数据库集成

### Phase 3: 功能扩展 📅
- [ ] GitHub API 集成
- [ ] 项目搜索推荐
- [ ] 实时数据展示
- [ ] 文件上传管理
- [ ] 评论系统

### Phase 4: 部署优化 📅
- [ ] Docker 容器化
- [ ] CI/CD 流程
- [ ] 性能监控
- [ ] 日志系统
- [ ] 备份策略

## 🔧 环境要求

- Node.js >= 16.x
- npm >= 8.x
- 支持 WebGL 的现代浏览器
- VPS 服务器（用于生产部署）

## 📝 开发笔记

### 性能优化
- 移动端关闭抗锯齿（提升性能）
- 降低移动端像素比（1-1.5x）
- 减少移动端星星数量（1000 vs 2000）
- 启用阻尼效果（更流畅的交互）

### 浏览器兼容性
- Chrome/Edge: ✅ 完全支持
- Firefox: ✅ 完全支持
- Safari: ✅ 完全支持
- 移动浏览器: ✅ 优化支持

## 📄 License

MIT

## 👤 作者

**Zaki**

- Website: [www.zze.cc](http://www.zze.cc)
- GitHub: [@cshaizhihao](https://github.com/cshaizhihao)

---

⚡ Powered by React + Three.js | 🎨 Cyberpunk Style | 🚀 Built with ❤️
