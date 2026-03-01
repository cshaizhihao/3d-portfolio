import {
  getUserRepos,
  getRepoDetails,
  searchRepos,
  getUserInfo,
  getRecommendedRepos,
  convertRepoToProject,
} from '../utils/github.js';
import Project from '../models/Project.js';
import { successResponse, errorResponse } from '../utils/response.js';

// @desc    获取 GitHub 用户信息
// @route   GET /api/github/user/:username
// @access  Public
export const getGitHubUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const userInfo = await getUserInfo(username);
    
    successResponse(res, 200, 'User info fetched successfully', userInfo);
  } catch (error) {
    next(error);
  }
};

// @desc    获取用户的所有仓库
// @route   GET /api/github/repos/:username
// @access  Public
export const getGitHubRepos = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { sort, per_page } = req.query;
    
    const repos = await getUserRepos(username, { sort, per_page });
    
    successResponse(res, 200, 'Repos fetched successfully', repos);
  } catch (error) {
    next(error);
  }
};

// @desc    搜索 GitHub 仓库
// @route   GET /api/github/search
// @access  Public
export const searchGitHubRepos = async (req, res, next) => {
  try {
    const { q, sort, per_page } = req.query;
    
    if (!q) {
      return errorResponse(res, 400, 'Search query is required');
    }
    
    const repos = await searchRepos(q, { sort, per_page });
    
    successResponse(res, 200, 'Search results fetched successfully', repos);
  } catch (error) {
    next(error);
  }
};

// @desc    获取推荐的仓库
// @route   GET /api/github/recommended/:username
// @access  Public
export const getRecommendedGitHubRepos = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { minStars, language, limit, excludeForks } = req.query;
    
    const criteria = {
      minStars: minStars ? parseInt(minStars) : 0,
      language,
      limit: limit ? parseInt(limit) : 10,
      excludeForks: excludeForks === 'true',
    };
    
    const repos = await getRecommendedRepos(username, criteria);
    
    successResponse(res, 200, 'Recommended repos fetched successfully', repos);
  } catch (error) {
    next(error);
  }
};

// @desc    从 GitHub 同步项目
// @route   POST /api/github/sync/:username
// @access  Private (Admin)
export const syncGitHubProjects = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { minStars = 0, excludeForks = true, limit = 20 } = req.body;
    
    // 获取推荐的仓库
    const repos = await getRecommendedRepos(username, {
      minStars,
      excludeForks,
      limit,
    });
    
    const syncedProjects = [];
    const errors = [];
    
    // 转换并创建项目
    for (const repo of repos) {
      try {
        // 检查项目是否已存在
        const existingProject = await Project.findOne({ github: repo.html_url });
        
        if (existingProject) {
          continue; // 跳过已存在的项目
        }
        
        // 转换为项目格式
        const projectData = await convertRepoToProject(repo);
        
        // 创建项目
        const project = await Project.create({
          ...projectData,
          createdBy: req.user.id,
        });
        
        syncedProjects.push(project);
      } catch (error) {
        errors.push({
          repo: repo.name,
          error: error.message,
        });
      }
    }
    
    successResponse(res, 200, 'GitHub projects synced successfully', {
      synced: syncedProjects.length,
      skipped: repos.length - syncedProjects.length - errors.length,
      errors: errors.length,
      projects: syncedProjects,
      errorDetails: errors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    从单个 GitHub 仓库导入项目
// @route   POST /api/github/import
// @access  Private (Admin)
export const importGitHubRepo = async (req, res, next) => {
  try {
    const { owner, repo } = req.body;
    
    if (!owner || !repo) {
      return errorResponse(res, 400, 'Owner and repo name are required');
    }
    
    // 获取仓库详情
    const repoDetails = await getRepoDetails(owner, repo);
    
    // 检查是否已存在
    const existingProject = await Project.findOne({ github: repoDetails.html_url });
    if (existingProject) {
      return errorResponse(res, 400, 'Project already exists');
    }
    
    // 转换为项目格式
    const projectData = await convertRepoToProject(repoDetails);
    
    // 创建项目
    const project = await Project.create({
      ...projectData,
      createdBy: req.user.id,
    });
    
    successResponse(res, 201, 'Project imported successfully', project);
  } catch (error) {
    next(error);
  }
};
