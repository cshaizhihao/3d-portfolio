import express from 'express';
import {
  uploadImage,
  uploadImageFromUrl,
  getImages,
  getImage,
  updateImage,
  deleteImage,
  getImagesByCategory,
} from '../controllers/imageController.js';
import { protect, admin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { idValidation } from '../middleware/validation.js';

const router = express.Router();

// 公开路由
router.get('/', getImages);
router.get('/category/:category', getImagesByCategory);
router.get('/:id', idValidation, getImage);

// 受保护路由（仅管理员）
router.post('/upload', protect, admin, upload.single('image'), uploadImage);
router.post('/upload-url', protect, admin, uploadImageFromUrl);
router.put('/:id', protect, admin, idValidation, updateImage);
router.delete('/:id', protect, admin, idValidation, deleteImage);

export default router;
