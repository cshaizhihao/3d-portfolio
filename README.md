# 🚀 3D Portfolio - 个人展示网站

> 基于 React + Three.js 的赛博朋克风格个人作品展示平台

[![开发进度](https://img.shields.io/badge/进度-Phase%201%20完成-00ff88?style=for-the-badge)](https://github.com/cshaizhihao/3d-portfolio)
[![License](https://img.shields.io/badge/license-MIT-0088ff?style=for-the-badge)](LICENSE)

## 📊 开发进度总览

```
总体进度: ████████████████░░░░ 85% (3.5/5 阶段完成)

Phase 1: 前端架构升级     ████████████████████ 100% ✅
Phase 2: 后端服务搭建     ████████████████████ 100% ✅
Phase 3: 管理控制台       ████████████████████ 100% ✅
Phase 4: 高级功能扩展     ████████░░░░░░░░░░░░  40% 🚧
Phase 5: 部署与优化       ░░░░░░░░░░░░░░░░░░░░   0% 📅
```

### 🎯 当前状态：Phase 4 进行中 🚧

**最近更新**: 2026-03-01 22:01
- ✅ 前后端完整集成
- ✅ 管理员控制台
- ✅ 项目 CRUD 功能
- ✅ GitHub API 集成
- ✅ 自动同步 GitHub 项目
- ✅ 智能推荐算法
- 🚧 3D 场景增强（待开发）
- 🚧 数据可视化（待开发）

**下一步**: 完成 Phase 4 剩余功能 🚧

---

## 🗺️ 完整开发路线图

### Phase 1: 前端架构升级 ✅ (已完成)

**时间**: 1-2 周 | **状态**: 100% 完成

- [x] React Router 路由系统
- [x] 赛博朋克导航栏（Glitch 效果 + 扫描线）
- [x] 4 个核心页面
  - [x] Home - 3D 场景 + 英雄区
  - [x] Projects - 项目展示卡片
  - [x] About - 个人介绍 + 技术栈
  - [x] Login - 管理员登录界面
- [x] 响应式设计（桌面 + 移动端）
- [x] 赛博朋克视觉效果
  - [x] 网格背景动画
  - [x] 霓虹光晕
  - [x] 扫描线特效
  - [x] Glitch 故障动画
  - [x] 发光边框和按钮

**成果**: 完整的前端页面框架 + 赛博朋克 UI

---

### Phase 2: 后端服务搭建 ✅ (已完成)

**时间**: 2-3 周 | **状态**: 100% 完成

#### 2.1 项目初始化
- [x] 创建 `server/` 目录
- [x] 安装依赖 (Express, MongoDB, JWT, bcrypt)
- [x] 配置环境变量

#### 2.2 基础架构
- [x] Express 服务器搭建
- [x] MongoDB 数据库连接
- [x] 路由系统设计
- [x] 中间件配置

#### 2.3 核心功能
- [x] 用户认证系统
  - [x] 注册 API
  - [x] 登录 API (JWT)
  - [x] Token 验证中间件
- [x] 项目管理 API
  - [x] 创建项目
  - [x] 读取项目列表
  - [x] 更新项目
  - [x] 删除项目
- [ ] 文件上传功能
  - [ ] 图片上传
  - [ ] 文件存储管理

#### 2.4 数据库设计
- [x] User 模型（用户、密码、角色）
- [x] Project 模型（标题、描述、链接、标签）
- [x] Config 模型（网站配置）

**成果**: 完整的后端 API 服务 + 测试通过

---

### Phase 3: 管理控制台 ✅ (已完成)

**时间**: 1-2 周 | **状态**: 100% 完成

- [x] 登录系统集成
- [x] Dashboard 数据统计
- [x] 项目管理界面
  - [x] 添加/编辑/删除项目
  - [x] 表格展示
  - [x] 表单验证
- [x] 前后端 API 集成
- [x] AuthContext 全局状态
- [x] ProtectedRoute 路由保护
- [x] React Hot Toast 通知
- [x] 实时数据更新

**成果**: 功能完整的管理后台 + 前后端打通

---

### Phase 4: 高级功能扩展 🚧 (进行中)

**时间**: 2-3 周 | **状态**: 40% 完成

#### 4.1 GitHub 集成 ✅
- [x] GitHub API 认证（Octokit）
- [x] 获取用户信息和仓库
- [x] 仓库搜索功能
- [x] 项目推荐算法
  - [x] 基于 stars 数量
  - [x] 基于最近更新
  - [x] 智能排序
- [x] 自动同步 GitHub 项目
- [x] 单个仓库导入
- [x] 自动转换仓库格式
- [ ] 前端同步界面（待开发）

#### 4.2 3D 场景增强 📅
- [ ] 动态加载项目模型
- [ ] 项目卡片 3D 悬浮
- [ ] 交互式项目展示
- [ ] 粒子效果
- [ ] 后处理效果（Bloom、Glitch）

#### 4.3 数据可视化 📅
- [ ] 技术栈雷达图
- [ ] 项目时间线
- [ ] GitHub 贡献热力图
- [ ] 访问统计图表

**预期成果**: 丰富的交互功能 + GitHub 深度集成

---

### Phase 5: 部署与优化 📅 (计划中)

**时间**: 1 周 | **状态**: 待开始

- [ ] Docker 容器化
  - [ ] Dockerfile 编写
  - [ ] docker-compose.yml 配置
- [ ] Nginx 反向代理配置
- [ ] 性能优化
  - [ ] 代码分割
  - [ ] 图片懒加载
  - [ ] Gzip 压缩
- [ ] 监控与日志
  - [ ] PM2 进程管理
  - [ ] 日志系统
  - [ ] 错误追踪

**预期成果**: 生产环境就绪

---

## 📋 项目概述

这是一个展示个人风格和项目作品的 3D 交互式网站，采用赛博朋克视觉风格，支持后端管理和多种自定义功能。

## ✨ 核心特性

### 当前已实现 ✅
- ✅ 3D 交互场景（Three.js + React Three Fiber）
- ✅ 响应式设计（桌面端 + 移动端适配）
- ✅ 赛博朋克配色（霓虹绿 #00ff88 主题）
- ✅ 移动端触摸优化（单指旋转、双指缩放）
- ✅ WebGL 检测和降级处理
- ✅ 网格背景动画
- ✅ 霓虹光晕效果
- ✅ 扫描线特效
- ✅ Glitch 故障动画
- ✅ Express.js REST API 服务器
- ✅ MongoDB + Mongoose 数据库
- ✅ JWT 身份认证系统
- ✅ 用户注册/登录 API
- ✅ 项目 CRUD API
- ✅ 角色权限控制（Admin/User）
- ✅ 数据验证和安全防护
- ✅ 前后端完整集成
- ✅ 管理员控制台（Dashboard + 项目管理）
- ✅ React Hot Toast 通知系统
- ✅ 路由保护和权限验证
- ✅ GitHub API 集成
- ✅ 自动同步 GitHub 项目
- ✅ 智能推荐算法（stars + 更新时间）
- ✅ 仓库自动转换为项目格式
- ✅ 图库系统（图片上传和管理）
- ✅ 图片分类（英雄图、项目图、图库、头像）
- ✅ 自动生成缩略图
- ✅ 图库管理界面

### 开发中 🚧
- 🔨 3D 场景增强（粒子效果、后处理）
- 🔨 数据可视化（技术栈雷达图、时间线）

### 计划中 📅
- 📝 数据库集成（MongoDB）
- 📝 文件上传功能
- 📝 实时数据更新
- 📝 SEO 优化
- 📝 Docker 容器化部署

## 🎨 设计风格

**赛博朋克主题色**
- 主色：霓虹绿 `#00ff88`
- 辅色：电蓝 `#0088ff`、粉红 `#ff0088`、紫色 `#8800ff`
- 背景：纯黑 `#000`
- 特效：发光阴影、模糊背景、渐变按钮、网格地板

## 🛠️ 技术栈

### 前端
- **框架**: React 19.2.4
- **3D 渲染**: Three.js 0.183.2
- **React 集成**: @react-three/fiber + @react-three/drei
- **路由**: React Router v6
- **构建工具**: Create React App

### 后端（规划中）
- **运行时**: Node.js
- **框架**: Express.js
- **认证**: JWT + bcrypt
- **数据库**: MongoDB
- **API**: RESTful

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
│   ├── components/      # 组件
│   │   └── Navigation.js/css
│   ├── pages/           # 页面
│   │   ├── Home.js/css
│   │   ├── Projects.js/css
│   │   ├── About.js/css
│   │   └── Login.js/css
│   ├── App.js          # 主应用
│   ├── App.css         # 全局样式
│   └── index.js        # 入口文件
├── server/             # 后端服务（待创建）
│   ├── routes/         # API 路由
│   ├── models/         # 数据模型
│   ├── middleware/     # 中间件
│   └── config/         # 配置文件
├── README.md
├── IMPLEMENTATION.md   # 详细实施计划
└── package.json
```

## 🚀 快速开始

### 前端开发

```bash
# 克隆仓库
git clone https://github.com/cshaizhihao/3d-portfolio.git
cd 3d-portfolio

# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建生产版本
npm run build
```

### 访问地址

**开发环境**:
- 本地: http://localhost:3000
- IP: http://141.98.197.210:3001

**页面导航**:
- 首页: `/` - 3D 场景展示
- 项目: `/projects` - 项目列表
- 关于: `/about` - 个人介绍
- 登录: `/login` - 管理后台

## 🎯 已有项目展示

本网站将展示以下项目：

- **Komari探针** - [www.zze.cc](http://www.zze.cc)
  - 服务器监控探针，实时监控系统状态
- **剩余价值计算器** - [syjz.zze.cc](http://syjz.zze.cc)
  - 工资计算工具，帮你算清楚老板赚了多少
- **公共图床** - [tuchuang.zze.cc](http://tuchuang.zze.cc)
  - 免费图片托管服务，支持多种格式

## 📅 时间估算

| 阶段 | 预计时间 | 状态 | 优先级 |
|------|---------|------|--------|
| Phase 1: 前端升级 | 1-2 周 | ✅ 完成 | 🔴 高 |
| Phase 2: 后端搭建 | 2-3 周 | ✅ 完成 | 🔴 高 |
| Phase 3: 管理控制台 | 1-2 周 | ✅ 完成 | 🟡 中 |
| Phase 4: 高级功能 | 2-3 周 | 🚧 进行中 (40%) | 🟢 低 |
| Phase 5: 部署优化 | 1 周 | 📅 计划中 | 🟡 中 |

**总计**: 7-11 周（约 2-3 个月）

## 🚀 MVP 快速启动

如果想快速上线，可以先实现最小可行产品（3-4 周）：

1. ✅ 前端基础页面（1 周）- **已完成**
2. 🚧 后端 API（项目 CRUD）（1 周）- **进行中**
3. 📅 简单的管理后台（1 周）
4. 📅 VPS 部署（1 天）

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

### 视觉特效
- 网格背景动画（透视移动）
- 霓虹光晕（脉冲动画）
- 扫描线特效（垂直滚动）
- Glitch 故障效果（随机闪烁）
- 发光滚动条
- 文本选中高亮

## 📄 License

MIT

## 👤 作者

**Zaki**

- Website: [www.zze.cc](http://www.zze.cc)
- GitHub: [@cshaizhihao](https://github.com/cshaizhihao)

---

⚡ Powered by React + Three.js | 🎨 Cyberpunk Style | 🚀 Built with ❤️

**最后更新**: 2026-03-01 22:15 GMT+8
