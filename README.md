# 🚀 3D Portfolio - 个人展示网站

> 基于 React + Three.js 的赛博朋克风格个人作品展示平台

[![开发进度](https://img.shields.io/badge/进度-Phase%204%20完成-00ff88?style=for-the-badge)](https://github.com/cshaizhihao/3d-portfolio)
[![License](https://img.shields.io/badge/license-MIT-0088ff?style=for-the-badge)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-cshaizhihao%2F3d--portfolio-181717?style=for-the-badge&logo=github)](https://github.com/cshaizhihao/3d-portfolio)

## 📊 开发进度总览

```
总体进度: ████████████████████ 98% (4.8/5 阶段完成)

Phase 1: 前端架构升级     ████████████████████ 100% ✅
Phase 2: 后端服务搭建     ████████████████████ 100% ✅
Phase 3: 管理控制台       ████████████████████ 100% ✅
Phase 4: 高级功能扩展     ███████████████████░  98% ✅
Phase 5: 部署与优化       ░░░░░░░░░░░░░░░░░░░░   0% 📅
```

### 🎯 当前状态：Phase 4 接近完成 ✅

**最后更新**: 2026-03-02 01:27 GMT+8

**GitHub 仓库**: https://github.com/cshaizhihao/3d-portfolio

### ✨ 最新功能：

**完全可自定义的内容管理** 📝
- ✅ 首页英雄图、标题、描述（后台设置）
- ✅ About 页面所有内容可编辑（后台设置）
- ✅ 技术栈列表可自定义
- ✅ 联系方式可自定义
- ✅ 标签页管理界面

**前后台完整打通** 🔗
- ✅ 首页显示英雄图背景（后台设置）
- ✅ 首页显示网站标题和描述（后台设置）
- ✅ About 页面动态加载内容（后台设置）
- ✅ 导航栏显示用户头像（后台上传）
- ✅ 图库管理系统（上传、编辑、删除）
- ✅ 网络图片链接上传
- ✅ 用户资料管理
- ✅ 网站设置页面（标签化）
- ✅ 线索收集表单（前台）+ 后台线索列表
- ✅ SEO 设置（首页/About/Projects）
- ✅ 项目结果指标展示

**图库功能** 📸
- ✅ 本地图片上传
- ✅ 网络图片链接添加
- ✅ 图片分类管理（头像、英雄图、项目图、图库、其他）
- ✅ 图片编辑（标题、描述、分类、标签）
- ✅ 自动生成缩略图
- ✅ 图片预览和删除

**GitHub 集成** 💻
- ✅ 自动同步 GitHub 项目
- ✅ 智能推荐算法（stars + 更新时间）
- ✅ 仓库自动转换为项目格式
- ✅ 单个仓库导入

---

## 🌐 访问说明

为保护隐私与部署安全，README 不再展示真实服务器 IP/端口。

### 前台页面
- **首页**: `/`
- **项目展示**: `/projects`
- **关于我**: `/about`

### 后台管理（需要登录）
- **登录页面**: `/login`
- **管理后台**: `/admin`
- **图库管理**: `/gallery`
- **用户资料**: `/profile`
- **网站设置**: `/settings`

### API 服务
- **后端 API 前缀**: `/api`
- **健康检查**: `/health`

### 测试账号
- **邮箱**: zaki@example.com
- **密码**: password123
- **角色**: Admin

---

## 🎨 功能特性

### 前台功能
- ✅ 3D 交互场景（Three.js + React Three Fiber）
- ✅ 响应式设计（桌面端 + 移动端适配）
- ✅ 赛博朋克配色（霓虹绿 #00ff88 主题）
- ✅ 移动端触摸优化（单指旋转、双指缩放）
- ✅ WebGL 检测和降级处理
- ✅ 网格背景动画
- ✅ 霓虹光晕效果
- ✅ 扫描线特效
- ✅ Glitch 故障动画
- ✅ 英雄图背景显示（后台设置）
- ✅ 网站标题和描述（后台设置）
- ✅ 用户头像显示（导航栏）

### 后台功能
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
- ✅ 图库系统（图片上传和管理）
- ✅ 图片分类（英雄图、项目图、图库、头像）
- ✅ 自动生成缩略图
- ✅ 图库管理界面
- ✅ 网络图片链接上传
- ✅ 用户资料管理
- ✅ 网站配置系统

---

## 📝 使用指南

### 1. 设置首页内容
1. 登录管理后台
2. 进入网站设置（/settings）
3. 点击"🏠 首页设置"标签
4. 选择英雄图
5. 编辑网站标题和描述
6. 点击保存

### 2. 设置 About 页面
1. 进入网站设置（/settings）
2. 点击"👤 About 页面"标签
3. 编辑页面标题和副标题
4. 编辑个人介绍（Who Am I, What I Do, Why I Code）
5. 编辑技术栈（逗号分隔）
6. 编辑联系方式（文本、网站链接、GitHub 链接）
7. 点击保存
8. 刷新 About 页面查看效果

### 3. 设置用户头像
1. 进入图库管理
2. 上传图片，分类选择"头像"
3. 进入用户资料（/profile）
4. 点击"更换头像"
5. 选择图片并保存
6. 导航栏显示新头像

### 3. 设置用户头像
1. 进入图库管理
2. 上传图片，分类选择"头像"
3. 进入用户资料（/profile）
4. 点击"更换头像"
5. 选择图片并保存
6. 导航栏显示新头像

### 4. 添加网络图片
1. 进入图库管理
2. 点击"🔗 添加链接"
3. 粘贴图片 URL
4. 填写标题、描述、分类
5. 点击添加

### 4. 添加网络图片
1. 进入图库管理
2. 点击"🔗 添加链接"
3. 粘贴图片 URL
4. 填写标题、描述、分类
5. 点击添加

### 5. 同步 GitHub 项目
1. 进入管理后台（/admin）
2. 点击"GitHub 同步"按钮
3. 设置筛选条件（最小 stars、排除 forks）
4. 点击同步
5. 自动导入 GitHub 项目

---

## 🛠️ 技术栈

### 前端
- **框架**: React 19.2.4
- **3D 渲染**: Three.js + React Three Fiber
- **路由**: React Router v6
- **状态管理**: React Context API
- **HTTP 客户端**: Axios
- **通知**: React Hot Toast
- **样式**: 纯 CSS（赛博朋克主题）

### 后端
- **运行时**: Node.js v24.14.0
- **框架**: Express.js
- **数据库**: MongoDB + Mongoose
- **认证**: JWT + bcryptjs
- **文件上传**: Multer
- **图片处理**: Sharp
- **安全**: Helmet + CORS + Rate Limiting
- **GitHub API**: @octokit/rest

---

## 📦 安装和运行

### 前置要求
- Node.js >= 18
- MongoDB
- Git

### 克隆项目
```bash
git clone https://github.com/cshaizhihao/3d-portfolio.git
cd 3d-portfolio
```

### 后端设置
```bash
cd server
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，设置 MongoDB 连接和 JWT 密钥

# 启动后端
npm run dev
```

### 前端设置
```bash
cd ..
npm install

# 配置环境变量
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# 启动前端
npm start
```

### 访问应用
- 前端: http://localhost:3001
- 后端: http://localhost:5000

---

## 📂 项目结构

```
3d-portfolio/
├── public/                 # 静态资源
├── src/                    # 前端源码
│   ├── api/               # API 客户端
│   ├── components/        # React 组件
│   ├── context/           # Context 状态管理
│   ├── pages/             # 页面组件
│   │   ├── Home.js       # 首页（3D 场景 + 英雄图）
│   │   ├── Projects.js   # 项目展示
│   │   ├── About.js      # 关于页面
│   │   ├── Login.js      # 登录页面
│   │   ├── Admin.js      # 管理后台
│   │   ├── Gallery.js    # 图库管理
│   │   ├── Profile.js    # 用户资料
│   │   └── Settings.js   # 网站设置
│   └── App.js             # 主应用
├── server/                 # 后端源码
│   ├── config/            # 配置文件
│   ├── controllers/       # 控制器
│   ├── middleware/        # 中间件
│   ├── models/            # 数据模型
│   ├── routes/            # 路由
│   ├── utils/             # 工具函数
│   ├── uploads/           # 上传文件目录
│   └── index.js           # 服务器入口
└── README.md              # 项目文档
```

---

## 🔧 环境变量

### 后端 (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/3d-portfolio
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3001,https://your-domain.com
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=your_github_username
```

### 前端 (.env)
```env
REACT_APP_API_URL=https://your-domain.com/api
```

---

## 🚀 部署

### VPS 部署（当前）
- **前端**: 由反向代理统一暴露（已隐藏具体地址）
- **后端**: 由反向代理统一暴露（已隐藏具体地址）
- **MongoDB**: Docker 容器

### 生产环境建议
1. 使用 Nginx 反向代理
2. 配置 SSL 证书（Let's Encrypt）
3. 使用 PM2 管理 Node.js 进程
4. MongoDB 启用认证
5. 配置防火墙规则

---

## 📄 API 文档

### 认证 API
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户
- `PUT /api/auth/profile` - 更新用户资料
- `PUT /api/auth/password` - 修改密码

### 项目 API
- `GET /api/projects` - 获取项目列表
- `GET /api/projects/:id` - 获取单个项目
- `POST /api/projects` - 创建项目（Admin）
- `PUT /api/projects/:id` - 更新项目（Admin）
- `DELETE /api/projects/:id` - 删除项目（Admin）
- `POST /api/projects/:id/like` - 点赞项目

### 图库 API
- `GET /api/images` - 获取图片列表
- `GET /api/images/:id` - 获取单个图片
- `GET /api/images/category/:category` - 按分类获取
- `POST /api/images/upload` - 上传图片（Admin）
- `POST /api/images/upload-url` - 从 URL 上传（Admin）
- `PUT /api/images/:id` - 更新图片信息（Admin）
- `DELETE /api/images/:id` - 删除图片（Admin）

### GitHub API
- `GET /api/github/user/:username` - 获取用户信息
- `GET /api/github/repos/:username` - 获取用户仓库
- `GET /api/github/search` - 搜索仓库
- `GET /api/github/recommended/:username` - 获取推荐仓库
- `POST /api/github/sync/:username` - 同步项目（Admin）
- `POST /api/github/import` - 导入单个仓库（Admin）

### 配置 API
- `GET /api/config/public/all` - 获取公开配置
- `GET /api/config` - 获取所有配置（Admin）
- `GET /api/config/:key` - 获取单个配置
- `POST /api/config` - 设置配置（Admin）
- `POST /api/config/bulk` - 批量设置配置（Admin）
- `DELETE /api/config/:key` - 删除配置（Admin）

### 线索 API
- `POST /api/leads` - 提交咨询线索（公开）
- `GET /api/leads` - 获取线索列表（Admin）
- `PUT /api/leads/:id/status` - 更新线索状态（Admin）

---

## 🎯 下一步计划

### Phase 5: 部署与优化
- [ ] Nginx 反向代理配置
- [ ] SSL 证书配置
- [ ] PM2 进程管理
- [ ] MongoDB 生产环境配置
- [ ] 性能优化
- [ ] SEO 优化
- [ ] 监控和日志系统

---

## 📝 更新日志

### 2026-03-02 01:27 - v1.48.0
- ✅ 全站 AAC 扩展为三段注入：Head / Body / Footer 均支持 HTML/CSS/JavaScript
- ✅ 后台设置新增 9 个注入配置项，可统一控制全站加载行为
- ✅ App 级注入引擎升级：自动清理旧注入并重新挂载，避免重复污染
- ✅ 首页继续去商业化，保持个人展示/博客风格
- ✅ 赛博相册尺寸进一步收敛，整体排版更克制

### 2026-03-02 01:19 - v1.47.0
- ✅ 新增全站 AAC Head 注入配置（后台可配 HTML / CSS / JavaScript）
- ✅ App 级生效：所有页面加载时统一注入自定义 Head 内容
- ✅ 首页风格继续转向个人展示：移除合作咨询入口，弱化商业导向
- ✅ 新增首页 AAC 文案联动：自定义头部/正文/页脚可直接前台展示
- ✅ 赛博相册再收敛：缩小展示面积、缩略图更紧凑，排版更清爽

### 2026-03-02 01:01 - v1.46.0
- ✅ README 隐私清理：移除真实服务器 IP/端口与公开暴露信息
- ✅ 修复首页刷新崩溃（alpha 报错）：移除不稳定后处理链路
- ✅ 首页继续下滑增强：新增“实用能力”和“常见问题”区块
- ✅ 页脚新增实用操作：一键复制联系邮箱
- ✅ 构建通过，主包较上版本下降约 17.42kB（gzip）

### 2026-03-02 00:53 - v1.45.0
- ✅ Hero 主视觉替换为 3D 文本核心：`ZAKI` 立体发光装置
- ✅ 赛博相册改造为可切换轮播：支持左右切换 + 自动播放 + 缩略图跳转
- ✅ 修复相册尺寸问题：主图改为 contain 展示，避免被裁切变形
- ✅ 新增首页赛博风页脚：品牌、快捷入口、联系按钮
- ⚠️ 构建通过；因 3D 文本依赖引入，主包体积上升（后续可做懒加载优化）

### 2026-03-02 00:46 - v1.44.0
- ✅ 首页 Hero 接管重构：两栏布局（左文案/右信息面板）
- ✅ Hero 主视觉升级为“能量核心 + 全息面板”场景化装置
- ✅ 修正主视觉空间位置与镜头参数，减少“几何体摆错位”问题
- ✅ 首页结构继续保持可下滑叙事（项目 + 相册）
- ✅ 构建验证通过，主包体积下降约 3.43kB（gzip）

### 2026-03-02 00:41 - v1.43.0
- ✅ Hero v2 执行：首屏布局与视觉层级重构（左文案右主视觉思路）
- ✅ Hero 主视觉换风格：能量核心构型替代简陋几何体感
- ✅ 首页继续下滑模块强化：精选项目 + 赛博相册可视区
- ✅ 快速咨询保持默认收起，仅按钮触发
- ✅ 霓虹火焰光点与移动烟雾持续优化

### 2026-03-02 00:31 - v1.42.0
- ✅ 首页结构重做：支持下滑到“精选项目 + 赛博相册”模块
- ✅ 快速咨询改为可收起浮层（不再常亮）
- ✅ Hero 3D 模型改造：由简陋几何体升级为更复杂构型
- ✅ 霓虹光点改为火焰式飘散轨迹（向上漂移消散）
- ✅ 继续强化赛博霓虹配色（青/粉/紫）

### 2026-03-02 00:24 - v1.41.0
- ✅ 赛博朋克配色重构：主色从单绿改为霓虹青/洋红/紫
- ✅ 全站核心页面统一替换高亮色（导航/首页/项目/设置/登录等）
- ✅ 烟雾特效重做：由固定雾层改为缓慢漂移扩散（含漂浮雾团）
- ✅ 激光雨与霓虹光点改为多霓虹渐变（青/粉/紫）

### 2026-03-02 00:19 - v1.40.0
- ✅ 重特效包：激光雨、赛博烟雾、全局故障层、霓虹光点
- ✅ 所有重特效支持后台独立开关（高级美化）
- ✅ 重特效支持密度参数（fxEffectDensity）
- ✅ 第二轮强化：项目封面 WebGL Distortion Hover
- ✅ 第二轮强化：参数化控制（噪点强度、粒子倍率）

### 2026-03-02 00:13 - v1.30.0
- ✅ 第二轮美化：项目封面 WebGL Distortion Hover（可后台开关）
- ✅ 第二轮美化：特效参数化（噪点强度、粒子倍率）
- ✅ 第二轮美化：HUD 统一皮肤（边框/光晕/高光层）
- ✅ 高级美化页新增更多兼容开关（扭曲 hover 开关）

### 2026-03-01 23:57 - v1.20.0
- ✅ 新增高级美化兼容开关（fxPreset/特效子开关）
- ✅ 首页接入后处理链（Bloom + Noise + Vignette + 色差）
- ✅ 项目卡接入 3D Tilt（可后台开关）
- ✅ 新增自定义光标（可后台开关，自动避开移动端）
- ✅ 新增页面转场动画（可后台开关，遵循 reduced-motion）
- ✅ Settings 新增“高级美化”标签统一控制

### 2026-03-01 23:42 - v1.10.0
- ✅ 三件套完成：线索表单 + 后台线索列表
- ✅ 三件套完成：SEO 设置（首页/About/Projects）并前台生效
- ✅ 三件套完成：项目结果指标（后台编辑 + 前台展示）
- ✅ 新增 `Lead` 模型与 `/api/leads` 接口
- ✅ 新增配置批量保存接口 `/api/config/bulk`，Settings 一次保存全部

### 2026-03-01 23:27 - v1.00.0
- ✅ 新增设置项：左上角 Logo 主/副标题可编辑
- ✅ 新增设置项：首页中部提示文案可编辑（桌面/移动）
- ✅ 新增设置项：首页三组统计值与标签可编辑
- ✅ 新增设置项：顶部导航各菜单文案可编辑
- ✅ 优化配置保存逻辑：新增 `/api/config/bulk` 批量保存接口
- ✅ Settings 改为一次请求保存全部配置，减少失败率和等待时间

### 2026-03-01 23:19 - v0.99.0
- ✅ 修复登录 429（开发环境关闭 API 限流）
- ✅ 修复配置读取错误（`response.data` 解包）
- ✅ 修复首页英雄图/文字不生效问题
- ✅ 修复 About 页面文字自定义不生效问题
- ✅ 修复 Settings 页面加载配置不生效问题

### 2026-03-01 23:01 - v0.98.0
- ✅ About 页面完全可自定义
- ✅ 设置页面标签化（首页 + About）
- ✅ 所有文字内容可后台编辑
- ✅ 技术栈可自定义
- ✅ 联系方式可自定义
- ✅ 支持换行和格式化

### 2026-03-01 22:54 - v0.95.0
- ✅ 前台显示英雄图背景
- ✅ 前台显示网站标题和描述
- ✅ 导航栏显示用户头像
- ✅ 图库管理系统完善
- ✅ 网络图片链接上传
- ✅ 用户资料管理
- ✅ 网站设置页面
- ✅ 前后台完整打通

### 2026-03-01 21:54 - v0.85.0
- ✅ 图库管理界面
- ✅ 图片编辑功能
- ✅ 图片分类管理
- ✅ 自动生成缩略图

### 2026-03-01 21:32 - v0.80.0
- ✅ 管理员控制台完成
- ✅ 前后端完整集成
- ✅ GitHub API 集成
- ✅ 自动同步 GitHub 项目

---

## 📧 联系方式

- **GitHub**: https://github.com/cshaizhihao
- **项目地址**: https://github.com/cshaizhihao/3d-portfolio

---

## 📄 许可证

MIT License

---

**Made with ❤️ by Zaki**

**赛博朋克时代的网络数字游民**
