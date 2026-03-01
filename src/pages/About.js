import React, { useState, useEffect } from 'react';
import { configAPI } from '../api';
import './About.css';

function About() {
  const [config, setConfig] = useState({
    aboutTitle: 'ABOUT ME',
    aboutSubtitle: '关于这个搞事情的人',
    whoAmI: '我是 Zaki，一个热爱折腾的开发者。\n喜欢用代码解决问题，更喜欢创造有趣的东西。',
    whatIDo: '全栈开发、服务器运维、瞎折腾各种技术。\n从前端到后端，从监控到图床，啥都搞。',
    whyICode: '因为写代码很爽啊！\n看着自己的想法变成现实，这感觉太他妈棒了。',
    techStack: 'React,Node.js,Three.js,MongoDB,Docker,Nginx,Linux,Git',
    contactText: '想聊聊？欢迎来撩~',
    websiteUrl: 'http://www.zze.cc',
    githubUrl: 'https://github.com/cshaizhihao',
    seoAboutTitle: 'ABOUT ME',
    seoAboutDescription: '关于 Zaki 的介绍与技术栈',
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await configAPI.getPublicConfigs();
      const publicConfig = response.data || {};
      setConfig({
        aboutTitle: publicConfig.aboutTitle || 'ABOUT ME',
        aboutSubtitle: publicConfig.aboutSubtitle || '关于这个搞事情的人',
        whoAmI: publicConfig.whoAmI || '我是 Zaki，一个热爱折腾的开发者。\n喜欢用代码解决问题，更喜欢创造有趣的东西。',
        whatIDo: publicConfig.whatIDo || '全栈开发、服务器运维、瞎折腾各种技术。\n从前端到后端，从监控到图床，啥都搞。',
        whyICode: publicConfig.whyICode || '因为写代码很爽啊！\n看着自己的想法变成现实，这感觉太他妈棒了。',
        techStack: publicConfig.techStack || 'React,Node.js,Three.js,MongoDB,Docker,Nginx,Linux,Git',
        contactText: publicConfig.contactText || '想聊聊？欢迎来撩~',
        websiteUrl: publicConfig.websiteUrl || 'http://www.zze.cc',
        githubUrl: publicConfig.githubUrl || 'https://github.com/cshaizhihao',
        seoAboutTitle: publicConfig.seoAboutTitle || 'ABOUT ME',
        seoAboutDescription: publicConfig.seoAboutDescription || '关于 Zaki 的介绍与技术栈',
      });
    } catch (error) {
      console.error('Failed to fetch config:', error);
    }
  };

  const techStackArray = config.techStack.split(',').map(t => t.trim());

  useEffect(() => {
    document.title = config.seoAboutTitle || 'ABOUT ME';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = config.seoAboutDescription || '关于 Zaki 的介绍与技术栈';
  }, [config.seoAboutTitle, config.seoAboutDescription]);

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title glitch" data-text={config.aboutTitle}>
            {config.aboutTitle}
          </h1>
          <p className="about-subtitle">// {config.aboutSubtitle}</p>
        </div>

        <div className="about-content">
          <div className="about-card">
            <div className="card-icon">👨‍💻</div>
            <h3>WHO AM I</h3>
            <p style={{ whiteSpace: 'pre-line' }}>
              {config.whoAmI}
            </p>
          </div>

          <div className="about-card">
            <div className="card-icon">🚀</div>
            <h3>WHAT I DO</h3>
            <p style={{ whiteSpace: 'pre-line' }}>
              {config.whatIDo}
            </p>
          </div>

          <div className="about-card">
            <div className="card-icon">💡</div>
            <h3>WHY I CODE</h3>
            <p style={{ whiteSpace: 'pre-line' }}>
              {config.whyICode}
            </p>
          </div>
        </div>

        <div className="tech-stack">
          <h2 className="stack-title">TECH STACK</h2>
          <div className="stack-grid">
            {techStackArray.map((tech, index) => (
              <div key={index} className="stack-item">{tech}</div>
            ))}
          </div>
        </div>

        <div className="contact-section">
          <h2 className="contact-title">GET IN TOUCH</h2>
          <p className="contact-text">{config.contactText}</p>
          <div className="contact-links">
            {config.websiteUrl && (
              <a href={config.websiteUrl} target="_blank" rel="noopener noreferrer" className="contact-link">
                🌐 Website
              </a>
            )}
            {config.githubUrl && (
              <a href={config.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-link">
                💻 GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
