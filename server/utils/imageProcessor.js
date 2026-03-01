import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { thumbnailDir } from '../middleware/upload.js';

// 生成缩略图
export const generateThumbnail = async (imagePath, filename) => {
  try {
    const thumbnailPath = path.join(thumbnailDir, `thumb-${filename}`);
    
    await sharp(imagePath)
      .resize(400, 400, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80 })
      .toFile(thumbnailPath);
    
    return thumbnailPath;
  } catch (error) {
    throw new Error(`Failed to generate thumbnail: ${error.message}`);
  }
};

// 获取图片尺寸
export const getImageDimensions = async (imagePath) => {
  try {
    const metadata = await sharp(imagePath).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
    };
  } catch (error) {
    throw new Error(`Failed to get image dimensions: ${error.message}`);
  }
};

// 优化图片
export const optimizeImage = async (imagePath, outputPath, quality = 85) => {
  try {
    const ext = path.extname(imagePath).toLowerCase();
    
    let pipeline = sharp(imagePath);
    
    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality });
    }
    
    await pipeline.toFile(outputPath);
    
    return outputPath;
  } catch (error) {
    throw new Error(`Failed to optimize image: ${error.message}`);
  }
};

// 删除文件
export const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Failed to delete file: ${error.message}`);
  }
};
