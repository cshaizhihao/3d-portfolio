import Image from '../models/Image.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { generateThumbnail, getImageDimensions, deleteFile } from '../utils/imageProcessor.js';
import path from 'path';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { uploadDir } from '../middleware/upload.js';

// @desc    上传图片
// @route   POST /api/images/upload
// @access  Private (Admin)
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 400, 'No file uploaded');
    }

    const { title, description, tags, category } = req.body;

    // 生成缩略图
    const thumbnailPath = await generateThumbnail(req.file.path, req.file.filename);
    
    // 获取图片尺寸
    const dimensions = await getImageDimensions(req.file.path);

    // 创建图片记录
    const image = await Image.create({
      title: title || req.file.originalname,
      description: description || '',
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      url: `/uploads/${req.file.filename}`,
      thumbnail: `/uploads/thumbnails/thumb-${req.file.filename}`,
      width: dimensions.width,
      height: dimensions.height,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      category: category || 'gallery',
      uploadedBy: req.user.id,
    });

    successResponse(res, 201, 'Image uploaded successfully', image);
  } catch (error) {
    // 删除已上传的文件
    if (req.file) {
      deleteFile(req.file.path);
    }
    next(error);
  }
};

// @desc    获取所有图片
// @route   GET /api/images
// @access  Public
export const getImages = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      tags,
      isPublic,
      sort = '-createdAt',
    } = req.query;

    // 构建查询
    const query = {};
    
    if (category) query.category = category;
    if (tags) query.tags = { $in: tags.split(',') };
    if (isPublic !== undefined) query.isPublic = isPublic === 'true';

    // 计算分页
    const skip = (page - 1) * limit;
    const total = await Image.countDocuments(query);

    // 查询图片
    const images = await Image.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('uploadedBy', 'username avatar')
      .lean();

    paginatedResponse(
      res,
      200,
      'Images fetched successfully',
      images,
      { page: parseInt(page), limit: parseInt(limit), total }
    );
  } catch (error) {
    next(error);
  }
};

// @desc    获取单个图片
// @route   GET /api/images/:id
// @access  Public
export const getImage = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id)
      .populate('uploadedBy', 'username avatar');

    if (!image) {
      return errorResponse(res, 404, 'Image not found');
    }

    // 增加浏览量
    image.views += 1;
    await image.save();

    successResponse(res, 200, 'Image fetched successfully', image);
  } catch (error) {
    next(error);
  }
};

// @desc    更新图片信息
// @route   PUT /api/images/:id
// @access  Private (Admin)
export const updateImage = async (req, res, next) => {
  try {
    const { title, description, tags, category, isPublic } = req.body;

    let image = await Image.findById(req.params.id);

    if (!image) {
      return errorResponse(res, 404, 'Image not found');
    }

    // 更新字段
    if (title) image.title = title;
    if (description !== undefined) image.description = description;
    if (tags) image.tags = tags.split(',').map(t => t.trim());
    if (category) image.category = category;
    if (isPublic !== undefined) image.isPublic = isPublic;

    await image.save();

    successResponse(res, 200, 'Image updated successfully', image);
  } catch (error) {
    next(error);
  }
};

// @desc    删除图片
// @route   DELETE /api/images/:id
// @access  Private (Admin)
export const deleteImage = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return errorResponse(res, 404, 'Image not found');
    }

    // 删除文件
    deleteFile(image.path);
    if (image.thumbnail) {
      const thumbnailPath = path.join(process.cwd(), 'server', image.thumbnail);
      deleteFile(thumbnailPath);
    }

    // 删除数据库记录
    await image.deleteOne();

    successResponse(res, 200, 'Image deleted successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    按分类获取图片
// @route   GET /api/images/category/:category
// @access  Public
export const getImagesByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { limit = 10 } = req.query;

    const images = await Image.find({ category, isPublic: true })
      .sort('-createdAt')
      .limit(parseInt(limit))
      .lean();

    successResponse(res, 200, 'Images fetched successfully', images);
  } catch (error) {
    next(error);
  }
};

// @desc    从 URL 上传图片
// @route   POST /api/images/upload-url
// @access  Private (Admin)
export const uploadImageFromUrl = async (req, res, next) => {
  try {
    const { url, title, description, tags, category } = req.body;

    if (!url) {
      return errorResponse(res, 400, 'Image URL is required');
    }

    // 验证 URL
    let imageUrl;
    try {
      imageUrl = new URL(url);
    } catch (error) {
      return errorResponse(res, 400, 'Invalid URL');
    }

    // 生成文件名
    const ext = path.extname(imageUrl.pathname) || '.jpg';
    const filename = `url-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    const filepath = path.join(uploadDir, filename);

    // 下载图片
    const protocol = imageUrl.protocol === 'https:' ? https : http;
    
    await new Promise((resolve, reject) => {
      const file = fs.createWriteStream(filepath);
      
      protocol.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
          return;
        }

        // 检查 Content-Type
        const contentType = response.headers['content-type'];
        if (!contentType || !contentType.startsWith('image/')) {
          reject(new Error('URL does not point to an image'));
          return;
        }

        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    });

    // 获取文件大小
    const stats = fs.statSync(filepath);
    const fileSize = stats.size;

    // 检查文件大小（10MB 限制）
    if (fileSize > 10 * 1024 * 1024) {
      deleteFile(filepath);
      return errorResponse(res, 400, 'Image size exceeds 10MB');
    }

    // 生成缩略图
    const thumbnailPath = await generateThumbnail(filepath, filename);
    
    // 获取图片尺寸
    const dimensions = await getImageDimensions(filepath);

    // 创建图片记录
    const image = await Image.create({
      title: title || filename,
      description: description || '',
      filename: filename,
      originalName: filename,
      mimetype: 'image/jpeg',
      size: fileSize,
      path: filepath,
      url: `/uploads/${filename}`,
      thumbnail: `/uploads/thumbnails/thumb-${filename}`,
      width: dimensions.width,
      height: dimensions.height,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      category: category || 'gallery',
      uploadedBy: req.user.id,
    });

    successResponse(res, 201, 'Image uploaded from URL successfully', image);
  } catch (error) {
    next(error);
  }
};
