import React from 'react';
import './Projects.css';

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Komari探针',
      description: '服务器监控探针，实时监控系统状态',
      url: 'http://www.zze.cc',
      tags: ['监控', '实时数据', 'Dashboard'],
      color: '#00ff88'
    },
    {
      id: 2,
      title: '剩余价值计算器',
      description: '工资计算工具，帮你算清楚老板赚了多少',
      url: 'http://syjz.zze.cc',
      tags: ['工具', '计算器', 'Web App'],
      color: '#0088ff'
    },
    {
      id: 3,
      title: '公共图床',
      description: '免费图片托管服务，支持多种格式',
      url: 'http://tuchuang.zze.cc',
      tags: ['图床', '文件上传', 'CDN'],
      color: '#ff0088'
    }
  ];

  return (
    <div className="projects-page">
      <div className="projects-container">
        <div className="projects-header">
          <h1 className="projects-title glitch" data-text="MY PROJECTS">
            MY PROJECTS
          </h1>
          <p className="projects-subtitle">// 我搞过的那些玩意儿</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card" style={{ '--accent-color': project.color }}>
              <div className="card-glow"></div>
              <div className="card-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">{tag}</span>
                  ))}
                </div>

                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <span>访问项目</span>
                  <span className="link-arrow">→</span>
                </a>
              </div>
              <div className="card-border"></div>
            </div>
          ))}
        </div>

        <div className="coming-soon">
          <p>🚀 更多项目正在路上...</p>
        </div>
      </div>
    </div>
  );
}

export default Projects;
