# 🚀 3D Portfolio API - Backend

> 赛博朋克风格个人作品展示平台的后端 API 服务

## 📋 技术栈

- **Node.js** - JavaScript 运行时
- **Express.js** - Web 框架
- **MongoDB + Mongoose** - 数据库
- **JWT** - 身份认证
- **bcryptjs** - 密码加密
- **express-validator** - 数据验证
- **helmet** - 安全头
- **cors** - 跨域支持
- **morgan** - 日志记录

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并修改配置：

```bash
cp .env.example .env
```

### 3. 启动 MongoDB

确保 MongoDB 正在运行：

```bash
# 本地 MongoDB
mongod

# 或使用 Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. 启动服务器

```bash
# 开发模式（热重载）
npm run dev

# 生产模式
npm start
```

服务器将运行在: **http://localhost:5000**

## 📚 API 文档

### 认证 API

#### 注册用户
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "zaki",
  "email": "zaki@example.com",
  "password": "password123",
  "role": "admin"
}
```

#### 登录
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "zaki@example.com",
  "password": "password123"
}
```

#### 获取当前用户信息
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### 更新用户信息
```http
PUT /api/auth/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "new_username",
  "bio": "Full-stack developer"
}
```

#### 修改密码
```http
PUT /api/auth/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

### 项目 API

#### 获取所有项目（支持分页、筛选、搜索）
```http
GET /api/projects?page=1&limit=10&status=active&featured=true&search=react
```

#### 获取精选项目
```http
GET /api/projects/featured
```

#### 获取单个项目
```http
GET /api/projects/:id
```

#### 创建项目（需要管理员权限）
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Komari探针",
  "description": "服务器监控探针",
  "url": "http://www.zze.cc",
  "github": "https://github.com/username/repo",
  "tags": ["监控", "实时数据"],
  "technologies": ["Node.js", "React"],
  "featured": true,
  "color": "#00ff88"
}
```

#### 更新项目（需要管理员权限）
```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### 删除项目（需要管理员权限）
```http
DELETE /api/projects/:id
Authorization: Bearer <token>
```

#### 点赞项目
```http
POST /api/projects/:id/like
```

## 📂 项目结构

```
server/
├── config/
│   └── db.js              # 数据库连接
├── controllers/
│   ├── authController.js  # 认证控制器
│   └── projectController.js # 项目控制器
├── middleware/
│   ├── auth.js            # JWT 认证中间件
│   ├── validation.js      # 数据验证中间件
│   └── error.js           # 错误处理中间件
├── models/
│   ├── User.js            # 用户模型
│   ├── Project.js         # 项目模型
│   └── Config.js          # 配置模型
├── routes/
│   ├── auth.js            # 认证路由
│   └── projects.js        # 项目路由
├── utils/
│   ├── colors.js          # 终端颜色工具
│   ├── jwt.js             # JWT 工具
│   └── response.js        # 响应格式化工具
├── .env                   # 环境变量
├── .env.example           # 环境变量示例
├── .gitignore
├── index.js               # 入口文件
├── package.json
└── README.md
```

## 🔐 认证流程

1. 用户注册或登录
2. 服务器返回 JWT Token
3. 客户端在请求头中携带 Token：`Authorization: Bearer <token>`
4. 服务器验证 Token 并返回数据

## 🛡️ 安全特性

- ✅ JWT 身份认证
- ✅ 密码 bcrypt 加密
- ✅ Helmet 安全头
- ✅ CORS 跨域保护
- ✅ 速率限制（防止暴力攻击）
- ✅ 数据验证（express-validator）
- ✅ MongoDB 注入防护

## 📝 环境变量说明

| 变量 | 说明 | 默认值 |
|------|------|--------|
| NODE_ENV | 运行环境 | development |
| PORT | 服务器端口 | 5000 |
| MONGODB_URI | MongoDB 连接字符串 | mongodb://localhost:27017/3d-portfolio |
| JWT_SECRET | JWT 密钥 | - |
| JWT_EXPIRE | Token 过期时间 | 7d |
| CORS_ORIGIN | 允许的跨域源 | http://localhost:3000 |

## 🧪 测试 API

使用 curl 测试：

```bash
# 健康检查
curl http://localhost:5000/health

# 注册用户
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"zaki","email":"zaki@example.com","password":"password123","role":"admin"}'

# 登录
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"zaki@example.com","password":"password123"}'

# 获取项目列表
curl http://localhost:5000/api/projects
```

## 📦 部署

### Docker 部署

```bash
# 构建镜像
docker build -t 3d-portfolio-api .

# 运行容器
docker run -d -p 5000:5000 --name portfolio-api 3d-portfolio-api
```

### PM2 部署

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start index.js --name "portfolio-api"

# 查看日志
pm2 logs portfolio-api

# 重启
pm2 restart portfolio-api
```

## 🐛 常见问题

### MongoDB 连接失败

确保 MongoDB 正在运行，并检查 `MONGODB_URI` 配置是否正确。

### CORS 错误

检查 `.env` 中的 `CORS_ORIGIN` 是否与前端地址匹配。

### Token 验证失败

确保请求头格式正确：`Authorization: Bearer <token>`

## 📄 License

MIT

## 👤 作者

**Zaki**

- Website: [www.zze.cc](http://www.zze.cc)
- GitHub: [@cshaizhihao](https://github.com/cshaizhihao)

---

⚡ Powered by Node.js + Express + MongoDB | 🔐 Secured with JWT | 🚀 Built with ❤️
