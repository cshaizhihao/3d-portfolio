import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { projectAPI } from '../api';
import toast from 'react-hot-toast';
import './Admin.css';

function Admin() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    github: '',
    tags: '',
    technologies: '',
    featured: false,
    color: '#00ff88',
  });

  // 加载项目列表
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getProjects({ limit: 100 });
      setProjects(response.data);
    } catch (error) {
      toast.error('加载项目失败');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingProject) {
        await projectAPI.updateProject(editingProject._id, projectData);
        toast.success('项目更新成功！');
      } else {
        await projectAPI.createProject(projectData);
        toast.success('项目创建成功！');
      }
      
      setShowModal(false);
      setEditingProject(null);
      resetForm();
      fetchProjects();
    } catch (error) {
      toast.error(error.message || '操作失败');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      url: project.url,
      github: project.github || '',
      tags: project.tags.join(', '),
      technologies: project.technologies.join(', '),
      featured: project.featured,
      color: project.color,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这个项目吗？')) return;

    try {
      await projectAPI.deleteProject(id);
      toast.success('项目删除成功！');
      fetchProjects();
    } catch (error) {
      toast.error('删除失败');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      url: '',
      github: '',
      tags: '',
      technologies: '',
      featured: false,
      color: '#00ff88',
    });
  };

  const handleNewProject = () => {
    setEditingProject(null);
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1 className="admin-title glitch" data-text="ADMIN DASHBOARD">
              ADMIN DASHBOARD
            </h1>
            <p className="admin-subtitle">// 欢迎回来, {user?.username}!</p>
          </div>
          <button className="btn-primary" onClick={handleNewProject}>
            ➕ 新建项目
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-value">{projects.length}</div>
              <div className="stat-label">总项目数</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <div className="stat-value">{projects.filter(p => p.featured).length}</div>
              <div className="stat-label">精选项目</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👁️</div>
            <div className="stat-info">
              <div className="stat-value">{projects.reduce((sum, p) => sum + p.views, 0)}</div>
              <div className="stat-label">总浏览量</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">❤️</div>
            <div className="stat-info">
              <div className="stat-value">{projects.reduce((sum, p) => sum + p.likes, 0)}</div>
              <div className="stat-label">总点赞数</div>
            </div>
          </div>
        </div>

        <div className="projects-table">
          <h2>项目管理</h2>
          <table>
            <thead>
              <tr>
                <th>标题</th>
                <th>URL</th>
                <th>标签</th>
                <th>精选</th>
                <th>浏览</th>
                <th>点赞</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>{project.title}</td>
                  <td>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      {project.url.substring(0, 30)}...
                    </a>
                  </td>
                  <td>
                    {project.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </td>
                  <td>{project.featured ? '⭐' : '-'}</td>
                  <td>{project.views}</td>
                  <td>{project.likes}</td>
                  <td className="actions">
                    <button className="btn-edit" onClick={() => handleEdit(project)}>
                      ✏️
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(project._id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 项目表单模态框 */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingProject ? '编辑项目' : '新建项目'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>项目标题</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>项目描述</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>项目 URL</label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>标签（逗号分隔）</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="监控, 实时数据, Dashboard"
                  />
                </div>

                <div className="form-group">
                  <label>技术栈（逗号分隔）</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>主题色</label>
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                    />
                    <span>设为精选项目</span>
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  取消
                </button>
                <button type="submit" className="btn-primary">
                  {editingProject ? '更新' : '创建'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
