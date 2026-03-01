import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
  getFeaturedProjects,
} from '../controllers/projectController.js';
import { protect, admin } from '../middleware/auth.js';
import { projectValidation, idValidation, queryValidation } from '../middleware/validation.js';

const router = express.Router();

// 公开路由
router.get('/', queryValidation, getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', idValidation, getProject);
router.post('/:id/like', idValidation, likeProject);

// 受保护路由（仅管理员）
router.post('/', protect, admin, projectValidation, createProject);
router.put('/:id', protect, admin, idValidation, projectValidation, updateProject);
router.delete('/:id', protect, admin, idValidation, deleteProject);

export default router;
