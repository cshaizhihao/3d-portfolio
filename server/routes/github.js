import express from 'express';
import {
  getGitHubUser,
  getGitHubRepos,
  searchGitHubRepos,
  getRecommendedGitHubRepos,
  syncGitHubProjects,
  importGitHubRepo,
} from '../controllers/githubController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// 公开路由
router.get('/user/:username', getGitHubUser);
router.get('/repos/:username', getGitHubRepos);
router.get('/search', searchGitHubRepos);
router.get('/recommended/:username', getRecommendedGitHubRepos);

// 受保护路由（仅管理员）
router.post('/sync/:username', protect, admin, syncGitHubProjects);
router.post('/import', protect, admin, importGitHubRepo);

export default router;
