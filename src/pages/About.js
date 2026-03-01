import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title glitch" data-text="ABOUT ME">
            ABOUT ME
          </h1>
          <p className="about-subtitle">// 关于这个搞事情的人</p>
        </div>

        <div className="about-content">
          <div className="about-card">
            <div className="card-icon">👨‍💻</div>
            <h3>WHO AM I</h3>
            <p>
              我是 Zaki，一个热爱折腾的开发者。<br/>
              喜欢用代码解决问题，更喜欢创造有趣的东西。
            </p>
          </div>

          <div className="about-card">
            <div className="card-icon">🚀</div>
            <h3>WHAT I DO</h3>
            <p>
              全栈开发、服务器运维、瞎折腾各种技术。<br/>
              从前端到后端，从监控到图床，啥都搞。
            </p>
          </div>

          <div className="about-card">
            <div className="card-icon">💡</div>
            <h3>WHY I CODE</h3>
            <p>
              因为写代码很爽啊！<br/>
              看着自己的想法变成现实，这感觉太他妈棒了。
            </p>
          </div>
        </div>

        <div className="tech-stack">
          <h2 className="stack-title">TECH STACK</h2>
          <div className="stack-grid">
            <div className="stack-item">React</div>
            <div className="stack-item">Node.js</div>
            <div className="stack-item">Three.js</div>
            <div className="stack-item">MongoDB</div>
            <div className="stack-item">Docker</div>
            <div className="stack-item">Nginx</div>
            <div className="stack-item">Linux</div>
            <div className="stack-item">Git</div>
          </div>
        </div>

        <div className="contact-section">
          <h2 className="contact-title">GET IN TOUCH</h2>
          <p className="contact-text">想聊聊？欢迎来撩~</p>
          <div className="contact-links">
            <a href="http://www.zze.cc" target="_blank" rel="noopener noreferrer" className="contact-link">
              🌐 Website
            </a>
            <a href="https://github.com/cshaizhihao" target="_blank" rel="noopener noreferrer" className="contact-link">
              💻 GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
