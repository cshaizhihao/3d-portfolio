# 3D Portfolio 实施计划

## 🎯 项目目标

打造一个赛博朋克风格的个人作品展示平台，支持：
1. 本地化 VPS 部署
2. 后端管理控制台
3. GitHub 搜索推荐等自定义功能

---

## 📋 分阶段实施计划

### Phase 1: 前端架构升级 (1-2 周)

#### 1.1 路由系统
- [ ] 安装 React Router
- [ ] 创建页面结构：
  - `/` - 首页（3D 场景）
  - `/projects` - 项目展示
  - `/about` - 关于我
  - `/admin` - 管理控制台
  - `/login` - 登录页

#### 1.2 赛博朋克 UI 组件库
- [ ] 设计系统定义（颜色、字体、间距）
- [ ] 基础组件：
  - Button（霓虹发光效果）
  - Card（玻璃态 + 边框发光）
  - Input（赛博朋克输入框）
  - Modal（弹窗）
  - Navigation（导航栏）
- [ ] 动画效果：
  - 扫描线动画
  - 故障效果（Glitch）
  - 霓虹闪烁

#### 1.3 项目展示模块
- [ ] 项目卡片组件
- [ ] 3D 项目展示（悬浮卡片）
- [ ] 项目详情页
- [ ] 技术栈标签
- [ ] 项目链接跳转

**预期成果**: 完整的前端页面框架 + 赛博朋克 UI

---

### Phase 2: 后端服务搭建 (2-3 周)

#### 2.1 项目初始化
```bash
mkdir server
cd server
npm init -y
npm install express cors dotenv bcryptjs jsonwebtoken mongoose
npm install -D nodemon
```

#### 2.2 基础架构
```
server/
├── config/
│   ├── db.js           # 数据库连接
│   └── auth.js         # JWT 配置
├── models/
│   ├── User.js         # 用户模型
│   ├── Project.js      # 项目模型
│   └── Config.js       # 配置模型
├── routes/
│   ├── auth.js         # 认证路由
│   ├── projects.js     # 项目 CRUD
│   ├── admin.js        # 管理员路由
│   └── github.js       # GitHub API
├── middleware/
│   ├── auth.js         # JWT 验证
│   └── admin.js        # 管理员权限
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   └── githubController.js
├── utils/
│   ├── logger.js       # 日志工具
│   └── validator.js    # 数据验证
├── .env                # 环境变量
├── index.js            # 入口文件
└── package.json
```

#### 2.3 核心功能
- [ ] 用户认证（注册/登录/JWT）
- [ ] 项目 CRUD API
- [ ] 文件上传（头像、项目图片）
- [ ] GitHub API 集成
- [ ] 管理员权限控制

#### 2.4 数据库设计

**User 模型**
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  role: String (admin/user),
  avatar: String,
  createdAt: Date
}
```

**Project 模型**
```javascript
{
  title: String,
  description: String,
  url: String,
  github: String,
  tags: [String],
  thumbnail: String,
  featured: Boolean,
  order: Number,
  createdAt: Date
}
```

**Config 模型**
```javascript
{
  key: String,
  value: Mixed,
  description: String
}
```

**预期成果**: 完整的后端 API 服务

---

### Phase 3: 管理控制台 (1-2 周)

#### 3.1 登录系统
- [ ] 登录页面（赛博朋克风格）
- [ ] JWT Token 管理
- [ ] 自动登录（Remember Me）
- [ ] 登出功能

#### 3.2 管理面板
- [ ] Dashboard（数据统计）
- [ ] 项目管理：
  - 添加/编辑/删除项目
  - 拖拽排序
  - 图片上传
  - 标签管理
- [ ] 配置管理：
  - 网站标题/描述
  - 社交链接
  - GitHub Token
- [ ] 用户管理（可选）

#### 3.3 实时预览
- [ ] 修改后实时预览
- [ ] 保存草稿功能
- [ ] 发布/撤回

**预期成果**: 功能完整的管理后台

---

### Phase 4: 高级功能 (2-3 周)

#### 4.1 GitHub 集成
- [ ] GitHub API 认证
- [ ] 仓库搜索
- [ ] 项目推荐算法：
  - 基于 stars 数量
  - 基于技术栈匹配
  - 基于最近更新
- [ ] 自动同步 GitHub 项目
- [ ] Commit 活动展示

#### 4.2 3D 场景增强
- [ ] 动态加载项目模型
- [ ] 项目卡片 3D 悬浮
- [ ] 交互式项目展示
- [ ] 粒子效果
- [ ] 后处理效果（Bloom、Glitch）

#### 4.3 数据可视化
- [ ] 技术栈雷达图
- [ ] 项目时间线
- [ ] GitHub 贡献热力图
- [ ] 访问统计

**预期成果**: 丰富的交互功能

---

### Phase 5: 部署与优化 (1 周)

#### 5.1 Docker 容器化
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "YOUR_PORT:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
    volumes:
      - ./uploads:/app/uploads
  
  mongodb:
    image: mongo:6
    volumes:
      - mongo-data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_USER}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASS}

volumes:
  mongo-data:
```

#### 5.2 Nginx 配置
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:YOUR_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        proxy_pass http://localhost:YOUR_PORT;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 5.3 性能优化
- [ ] 代码分割（React.lazy）
- [ ] 图片懒加载
- [ ] CDN 加速
- [ ] Gzip 压缩
- [ ] Service Worker（PWA）
- [ ] 数据库索引优化
- [ ] Redis 缓存

#### 5.4 监控与日志
- [ ] PM2 进程管理
- [ ] Winston 日志系统
- [ ] 错误追踪（Sentry）
- [ ] 性能监控
- [ ] 自动备份脚本

**预期成果**: 生产环境就绪

---

## 🛠️ 技术选型建议

### 数据库
- **MongoDB**: 灵活的文档存储，适合快速迭代
- **PostgreSQL**: 关系型数据库，数据一致性更好

**推荐**: MongoDB（开发速度快，适合项目展示类应用）

### 认证方案
- JWT + HttpOnly Cookie（安全性更好）
- Refresh Token 机制（长期登录）

### 文件存储
- 本地存储 + Nginx 静态服务
- 或使用对象存储（阿里云 OSS / 腾讯云 COS）

---

## 📅 时间估算

| 阶段 | 预计时间 | 优先级 |
|------|---------|--------|
| Phase 1: 前端升级 | 1-2 周 | 🔴 高 |
| Phase 2: 后端搭建 | 2-3 周 | 🔴 高 |
| Phase 3: 管理控制台 | 1-2 周 | 🟡 中 |
| Phase 4: 高级功能 | 2-3 周 | 🟢 低 |
| Phase 5: 部署优化 | 1 周 | 🟡 中 |

**总计**: 7-11 周（约 2-3 个月）

---

## 🚀 快速启动建议

### 最小可行产品 (MVP)
如果想快速上线，可以先实现：
1. ✅ 前端基础页面（1 周）
2. ✅ 后端 API（项目 CRUD）（1 周）
3. ✅ 简单的管理后台（1 周）
4. ✅ VPS 部署（1 天）

**MVP 时间**: 3-4 周

### 迭代优化
MVP 上线后，逐步添加：
- GitHub 集成
- 3D 场景增强
- 数据可视化
- 性能优化

---

## 📝 下一步行动

1. **确认技术栈**: MongoDB 还是 PostgreSQL？
2. **开始 Phase 1**: 前端路由 + UI 组件库
3. **准备后端环境**: 安装 Node.js、数据库
4. **设计 API 接口**: 定义前后端数据格式

需要我开始实施哪个部分？
