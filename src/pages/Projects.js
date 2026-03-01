import React, { useState, useEffect } from 'react';
import { configAPI, projectAPI } from '../api';
import toast from 'react-hot-toast';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fxEnableTilt, setFxEnableTilt] = useState(true);

  useEffect(() => {
    fetchProjects();
    fetchSeo();
  }, []);

  const fetchSeo = async () => {
    try {
      const response = await configAPI.getPublicConfigs();
      const cfg = response.data || {};
      const nextSeo = {
        title: cfg.seoProjectsTitle || '项目展示',
        description: cfg.seoProjectsDescription || '项目案例与结果展示',
      };
      setFxEnableTilt(cfg.fxEnableTilt !== false);
      document.title = nextSeo.title;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = nextSeo.description;
    } catch (error) {
      // ignore
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getProjects({ status: 'active', limit: 50 });
      setProjects(response.data);
    } catch (error) {
      toast.error('加载项目失败');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      await projectAPI.likeProject(id);
      // 更新本地状态
      setProjects(projects.map(p => 
        p._id === id ? { ...p, likes: p.likes + 1 } : p
      ));
      toast.success('点赞成功！');
    } catch (error) {
      toast.error('点赞失败');
    }
  };

  const handleCardMove = (event) => {
    if (!fxEnableTilt) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 10;
    const rotateX = (0.5 - y) * 8;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetCard = (event) => {
    event.currentTarget.style.transform = '';
  };

  if (loading) {
    return (
      <div className="projects-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading Projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="projects-container">
        <div className="projects-header">
          <h1 className="projects-title glitch" data-text="MY PROJECTS">
            MY PROJECTS
          </h1>
          <p className="projects-subtitle">// 我搞过的那些玩意儿</p>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <p>暂无项目，敬请期待...</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project._id}
                className={`project-card ${fxEnableTilt ? 'tilt-enabled' : ''}`}
                style={{ '--accent-color': project.color }}
                onMouseMove={handleCardMove}
                onMouseLeave={resetCard}
              >
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="project-tags">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="project-tag">{tech}</span>
                      ))}
                    </div>
                  )}

                  {project.resultMetrics && project.resultMetrics.length > 0 && (
                    <div className="result-metrics">
                      {project.resultMetrics.map((metric, index) => (
                        <span key={index} className="result-metric">📈 {metric}</span>
                      ))}
                    </div>
                  )}

                  <div className="project-stats">
                    <span className="stat">👁️ {project.views}</span>
                    <span className="stat">
                      <button 
                        className="like-btn" 
                        onClick={() => handleLike(project._id)}
                      >
                        ❤️ {project.likes}
                      </button>
                    </span>
                  </div>

                  <div className="project-links">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <span>访问项目</span>
                      <span className="link-arrow">→</span>
                    </a>
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="github-link"
                      >
                        💻 GitHub
                      </a>
                    )}
                  </div>
                </div>
                <div className="card-border"></div>
              </div>
            ))}
          </div>
        )}

        <div className="coming-soon">
          <p>🚀 更多项目正在路上...</p>
        </div>
      </div>
    </div>
  );
}

export default Projects;
