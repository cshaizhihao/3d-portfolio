import express from 'express';
import {
  getConfig,
  getAllConfigs,
  getPublicConfigs,
  setConfig,
  setConfigsBulk,
  deleteConfig,
} from '../controllers/configController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// 公开路由
router.get('/public/all', getPublicConfigs);

// 受保护路由
router.get('/', protect, admin, getAllConfigs);
router.get('/:key', getConfig);
router.post('/', protect, admin, setConfig);
router.post('/bulk', protect, admin, setConfigsBulk);
router.delete('/:key', protect, admin, deleteConfig);

export default router;
