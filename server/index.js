import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/error.js';
import './utils/colors.js'; // 加载颜色工具

// 导入路由
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import githubRoutes from './routes/github.js';

// 加载环境变量
dotenv.config();

// 连接数据库
connectDB();

// 初始化 Express
const app = express();

// 中间件
app.use(helmet()); // 安全头

// CORS 配置 - 支持多个源
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: function (origin, callback) {
    // 允许没有 origin 的请求（比如 curl、Postman）
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json()); // 解析 JSON
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码

// 日志中间件
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 速率限制
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 分钟
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 限制 100 次请求
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API 路由
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/github', githubRoutes);

// 根路由
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 3D Portfolio API - Cyberpunk Edition',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      projects: '/api/projects',
      github: '/api/github',
    },
  });
});

// 错误处理
app.use(notFound);
app.use(errorHandler);

// 启动服务器
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('  🚀 3D PORTFOLIO API - CYBERPUNK EDITION');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
  console.log(`  📡 Server running in ${process.env.NODE_ENV} mode`);
  console.log(`  🌐 URL: http://localhost:${PORT}`);
  console.log(`  ⚡ Health Check: http://localhost:${PORT}/health`);
  console.log('');
  console.log('  📚 API Endpoints:');
  console.log(`     • Auth:     /api/auth`);
  console.log(`     • Projects: /api/projects`);
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n👋 SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

export default app;
