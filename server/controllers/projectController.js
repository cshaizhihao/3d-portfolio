import Project from '../models/Project.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';

// @desc    获取所有项目（支持分页、筛选、搜索）
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      featured,
      tags,
      search,
      sort = '-createdAt',
    } = req.query;

    // 构建查询条件
    const query = {};

    if (status) query.status = status;
    if (featured !== undefined) query.featured = featured === 'true';
    if (tags) query.tags = { $in: tags.split(',') };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // 计算分页
    const skip = (page - 1) * limit;
    const total = await Project.countDocuments(query);

    // 查询项目
    const projects = await Project.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'username avatar')
      .lean();

    paginatedResponse(
      res,
      200,
      'Projects fetched successfully',
      projects,
      { page: parseInt(page), limit: parseInt(limit), total }
    );
  } catch (error) {
    next(error);
  }
};

// @desc    获取单个项目
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'username avatar bio');

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    // 增加浏览量
    project.views += 1;
    await project.save();

    successResponse(res, 200, 'Project fetched successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    创建项目
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res, next) => {
  try {
    const projectData = {
      ...req.body,
      createdBy: req.user.id,
    };

    const project = await Project.create(projectData);

    successResponse(res, 201, 'Project created successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    更新项目
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    successResponse(res, 200, 'Project updated successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    删除项目
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    await project.deleteOne();

    successResponse(res, 200, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    点赞项目
// @route   POST /api/projects/:id/like
// @access  Public
export const likeProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    project.likes += 1;
    await project.save();

    successResponse(res, 200, 'Project liked successfully', { likes: project.likes });
  } catch (error) {
    next(error);
  }
};

// @desc    获取精选项目
// @route   GET /api/projects/featured
// @access  Public
export const getFeaturedProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ featured: true, status: 'active' })
      .sort({ order: 1, createdAt: -1 })
      .limit(6)
      .populate('createdBy', 'username avatar')
      .lean();

    successResponse(res, 200, 'Featured projects fetched successfully', projects);
  } catch (error) {
    next(error);
  }
};
