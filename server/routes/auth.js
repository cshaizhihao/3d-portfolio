import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { registerValidation, loginValidation } from '../middleware/validation.js';

const router = express.Router();

// 公开路由
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// 受保护路由
router.get('/me', protect, getMe);
router.put('/update', protect, updateProfile);
router.put('/password', protect, updatePassword);

export default router;
