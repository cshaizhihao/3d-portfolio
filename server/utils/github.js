import { Octokit } from '@octokit/rest';

// 初始化 Octokit
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// 获取用户的所有仓库
export const getUserRepos = async (username, options = {}) => {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 100,
      ...options,
    });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch repos: ${error.message}`);
  }
};

// 获取仓库详情
export const getRepoDetails = async (owner, repo) => {
  try {
    const { data } = await octokit.repos.get({
      owner,
      repo,
    });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch repo details: ${error.message}`);
  }
};

// 获取仓库的语言统计
export const getRepoLanguages = async (owner, repo) => {
  try {
    const { data } = await octokit.repos.listLanguages({
      owner,
      repo,
    });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch languages: ${error.message}`);
  }
};

// 搜索仓库
export const searchRepos = async (query, options = {}) => {
  try {
    const { data } = await octokit.search.repos({
      q: query,
      sort: 'stars',
      order: 'desc',
      per_page: 30,
      ...options,
    });
    return data.items;
  } catch (error) {
    throw new Error(`Failed to search repos: ${error.message}`);
  }
};

// 获取用户信息
export const getUserInfo = async (username) => {
  try {
    const { data } = await octokit.users.getByUsername({
      username,
    });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch user info: ${error.message}`);
  }
};

// 获取用户的贡献活动
export const getUserActivity = async (username) => {
  try {
    const { data } = await octokit.activity.listPublicEventsForUser({
      username,
      per_page: 100,
    });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch user activity: ${error.message}`);
  }
};

// 推荐项目算法
export const getRecommendedRepos = async (username, criteria = {}) => {
  try {
    const repos = await getUserRepos(username);
    
    // 过滤和排序
    let filtered = repos.filter(repo => {
      // 排除 fork 的项目（可选）
      if (criteria.excludeForks && repo.fork) return false;
      
      // 最小 stars 数
      if (criteria.minStars && repo.stargazers_count < criteria.minStars) return false;
      
      // 特定语言
      if (criteria.language && repo.language !== criteria.language) return false;
      
      return true;
    });
    
    // 排序：stars + 最近更新
    filtered.sort((a, b) => {
      const scoreA = a.stargazers_count + (new Date(a.updated_at).getTime() / 1000000000);
      const scoreB = b.stargazers_count + (new Date(b.updated_at).getTime() / 1000000000);
      return scoreB - scoreA;
    });
    
    return filtered.slice(0, criteria.limit || 10);
  } catch (error) {
    throw new Error(`Failed to get recommended repos: ${error.message}`);
  }
};

// 将 GitHub 仓库转换为项目格式
export const convertRepoToProject = async (repo) => {
  try {
    // 获取语言统计
    const languages = await getRepoLanguages(repo.owner.login, repo.name);
    const technologies = Object.keys(languages).slice(0, 5); // 取前 5 个语言
    
    return {
      title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
      description: repo.description || 'No description provided',
      url: repo.homepage || repo.html_url,
      github: repo.html_url,
      tags: repo.topics || [],
      technologies,
      featured: repo.stargazers_count > 10, // stars > 10 自动设为精选
      color: '#00ff88',
      status: 'active',
    };
  } catch (error) {
    throw new Error(`Failed to convert repo: ${error.message}`);
  }
};
