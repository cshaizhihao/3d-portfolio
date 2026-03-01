import Config from '../models/Config.js';
import { successResponse, errorResponse } from '../utils/response.js';

// @desc    获取配置
// @route   GET /api/config/:key
// @access  Public (if isPublic) / Private
export const getConfig = async (req, res, next) => {
  try {
    const config = await Config.findOne({ key: req.params.key });

    if (!config) {
      return errorResponse(res, 404, 'Config not found');
    }

    // 检查是否公开
    if (!config.isPublic && !req.user) {
      return errorResponse(res, 401, 'Unauthorized');
    }

    successResponse(res, 200, 'Config fetched successfully', config);
  } catch (error) {
    next(error);
  }
};

// @desc    获取所有配置
// @route   GET /api/config
// @access  Private (Admin)
export const getAllConfigs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};

    const configs = await Config.find(query).sort('key');

    successResponse(res, 200, 'Configs fetched successfully', configs);
  } catch (error) {
    next(error);
  }
};

// @desc    获取公开配置
// @route   GET /api/config/public/all
// @access  Public
export const getPublicConfigs = async (req, res, next) => {
  try {
    const configs = await Config.find({ isPublic: true }).sort('key');

    // 转换为键值对对象
    const configObj = {};
    configs.forEach(config => {
      configObj[config.key] = config.value;
    });

    successResponse(res, 200, 'Public configs fetched successfully', configObj);
  } catch (error) {
    next(error);
  }
};

// @desc    设置配置
// @route   POST /api/config
// @access  Private (Admin)
export const setConfig = async (req, res, next) => {
  try {
    const { key, value, description, category, isPublic } = req.body;

    let config = await Config.findOne({ key });

    if (config) {
      // 更新现有配置
      config.value = value;
      if (description !== undefined) config.description = description;
      if (category) config.category = category;
      if (isPublic !== undefined) config.isPublic = isPublic;
      await config.save();
    } else {
      // 创建新配置
      config = await Config.create({
        key,
        value,
        description: description || '',
        category: category || 'other',
        isPublic: isPublic || false,
      });
    }

    successResponse(res, 200, 'Config saved successfully', config);
  } catch (error) {
    next(error);
  }
};

// @desc    批量设置配置
// @route   POST /api/config/bulk
// @access  Private (Admin)
export const setConfigsBulk = async (req, res, next) => {
  try {
    const { configs } = req.body;

    if (!Array.isArray(configs) || configs.length === 0) {
      return errorResponse(res, 400, 'configs must be a non-empty array');
    }

    const operations = configs
      .filter((item) => item && typeof item.key === 'string')
      .map((item) => ({
        updateOne: {
          filter: { key: item.key },
          update: {
            $set: {
              value: item.value,
              description: item.description || '',
              category: item.category || 'other',
              isPublic: item.isPublic ?? true,
            },
          },
          upsert: true,
        },
      }));

    if (operations.length === 0) {
      return errorResponse(res, 400, 'No valid config items provided');
    }

    await Config.bulkWrite(operations);

    successResponse(res, 200, 'Configs saved successfully', {
      count: operations.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    删除配置
// @route   DELETE /api/config/:key
// @access  Private (Admin)
export const deleteConfig = async (req, res, next) => {
  try {
    const config = await Config.findOne({ key: req.params.key });

    if (!config) {
      return errorResponse(res, 404, 'Config not found');
    }

    await config.deleteOne();

    successResponse(res, 200, 'Config deleted successfully');
  } catch (error) {
    next(error);
  }
};
