import React, { useState, useEffect } from 'react';
import { configAPI, imageAPI } from '../api';
import toast from 'react-hot-toast';
import './Settings.css';

function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [heroImages, setHeroImages] = useState([]);
  const [config, setConfig] = useState({
    // 首页配置
    heroImage: '',
    siteTitle: 'ZAKI.DEV',
    siteDescription: '赛博朋克时代的网络数字游民',
    // About 页面配置
    aboutTitle: 'ABOUT ME',
    aboutSubtitle: '关于这个搞事情的人',
    whoAmI: '我是 Zaki，一个热爱折腾的开发者。\n喜欢用代码解决问题，更喜欢创造有趣的东西。',
    whatIDo: '全栈开发、服务器运维、瞎折腾各种技术。\n从前端到后端，从监控到图床，啥都搞。',
    whyICode: '因为写代码很爽啊！\n看着自己的想法变成现实，这感觉太他妈棒了。',
    techStack: 'React,Node.js,Three.js,MongoDB,Docker,Nginx,Linux,Git',
    contactText: '想聊聊？欢迎来撩~',
    websiteUrl: 'http://www.zze.cc',
    githubUrl: 'https://github.com/cshaizhihao',
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await configAPI.getPublicConfigs();
      const publicConfig = response.data || {};
      setConfig({
        heroImage: publicConfig.heroImage || '',
        siteTitle: publicConfig.siteTitle || 'ZAKI.DEV',
        siteDescription: publicConfig.siteDescription || '赛博朋克时代的网络数字游民',
        aboutTitle: publicConfig.aboutTitle || 'ABOUT ME',
        aboutSubtitle: publicConfig.aboutSubtitle || '关于这个搞事情的人',
        whoAmI: publicConfig.whoAmI || '我是 Zaki，一个热爱折腾的开发者。\n喜欢用代码解决问题，更喜欢创造有趣的东西。',
        whatIDo: publicConfig.whatIDo || '全栈开发、服务器运维、瞎折腾各种技术。\n从前端到后端，从监控到图床，啥都搞。',
        whyICode: publicConfig.whyICode || '因为写代码很爽啊！\n看着自己的想法变成现实，这感觉太他妈棒了。',
        techStack: publicConfig.techStack || 'React,Node.js,Three.js,MongoDB,Docker,Nginx,Linux,Git',
        contactText: publicConfig.contactText || '想聊聊？欢迎来撩~',
        websiteUrl: publicConfig.websiteUrl || 'http://www.zze.cc',
        githubUrl: publicConfig.githubUrl || 'https://github.com/cshaizhihao',
      });
    } catch (error) {
      console.error('Failed to fetch config:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHeroImages = async () => {
    try {
      const response = await imageAPI.getImagesByCategory('hero');
      setHeroImages(response.data);
    } catch (error) {
      toast.error('加载英雄图失败咧');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const configs = [
        { key: 'heroImage', value: config.heroImage, description: '首页英雄图', category: 'theme' },
        { key: 'siteTitle', value: config.siteTitle, description: '网站标题', category: 'general' },
        { key: 'siteDescription', value: config.siteDescription, description: '网站描述', category: 'general' },
        { key: 'aboutTitle', value: config.aboutTitle, description: 'About 标题', category: 'general' },
        { key: 'aboutSubtitle', value: config.aboutSubtitle, description: 'About 副标题', category: 'general' },
        { key: 'whoAmI', value: config.whoAmI, description: 'Who Am I', category: 'general' },
        { key: 'whatIDo', value: config.whatIDo, description: 'What I Do', category: 'general' },
        { key: 'whyICode', value: config.whyICode, description: 'Why I Code', category: 'general' },
        { key: 'techStack', value: config.techStack, description: '技术栈', category: 'general' },
        { key: 'contactText', value: config.contactText, description: '联系文本', category: 'general' },
        { key: 'websiteUrl', value: config.websiteUrl, description: '网站链接', category: 'social' },
        { key: 'githubUrl', value: config.githubUrl, description: 'GitHub 链接', category: 'social' },
      ];

      for (const cfg of configs) {
        await configAPI.setConfig({ ...cfg, isPublic: true });
      }

      toast.success('设置保存成功咧！');
    } catch (error) {
      toast.error('保存失败咧');
    } finally {
      setSaving(false);
    }
  };

  const handleHeroSelect = (imageUrl) => {
    setConfig({ ...config, heroImage: imageUrl });
    setShowHeroModal(false);
    toast.success('英雄图已选择咧！记得保存哦');
  };

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://141.98.197.210:5000';
    return `${baseUrl}${url}`;
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title glitch" data-text="网站设置">
          网站设置
        </h1>

        {/* 标签页 */}
        <div className="settings-tabs">
          <button
            className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            🏠 首页设置
          </button>
          <button
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            👤 About 页面
          </button>
        </div>

        <div className="settings-content">
          {/* 首页设置 */}
          {activeTab === 'home' && (
            <>
              <div className="settings-section">
                <h2>🖼️ 首页英雄图</h2>
                <div className="hero-preview">
                  {config.heroImage ? (
                    <img src={getImageUrl(config.heroImage)} alt="Hero" />
                  ) : (
                    <div className="hero-placeholder">
                      <p>还没有设置英雄图咧</p>
                    </div>
                  )}
                </div>
                <button
                  className="btn-primary"
                  onClick={() => {
                    fetchHeroImages();
                    setShowHeroModal(true);
                  }}
                >
                  选择英雄图
                </button>
              </div>

              <div className="settings-section">
                <h2>📝 首页文字</h2>
                <div className="form-group">
                  <label>网站标题</label>
                  <input
                    type="text"
                    value={config.siteTitle}
                    onChange={(e) => setConfig({ ...config, siteTitle: e.target.value })}
                    placeholder="ZAKI.DEV"
                  />
                </div>

                <div className="form-group">
                  <label>网站描述</label>
                  <textarea
                    value={config.siteDescription}
                    onChange={(e) => setConfig({ ...config, siteDescription: e.target.value })}
                    rows="2"
                    placeholder="赛博朋克时代的网络数字游民"
                  />
                </div>
              </div>
            </>
          )}

          {/* About 页面设置 */}
          {activeTab === 'about' && (
            <>
              <div className="settings-section">
                <h2>📝 页面标题</h2>
                <div className="form-group">
                  <label>主标题</label>
                  <input
                    type="text"
                    value={config.aboutTitle}
                    onChange={(e) => setConfig({ ...config, aboutTitle: e.target.value })}
                    placeholder="ABOUT ME"
                  />
                </div>

                <div className="form-group">
                  <label>副标题</label>
                  <input
                    type="text"
                    value={config.aboutSubtitle}
                    onChange={(e) => setConfig({ ...config, aboutSubtitle: e.target.value })}
                    placeholder="关于这个搞事情的人"
                  />
                </div>
              </div>

              <div className="settings-section">
                <h2>💬 个人介绍</h2>
                <div className="form-group">
                  <label>Who Am I</label>
                  <textarea
                    value={config.whoAmI}
                    onChange={(e) => setConfig({ ...config, whoAmI: e.target.value })}
                    rows="3"
                    placeholder="介绍一下你自己咧..."
                  />
                </div>

                <div className="form-group">
                  <label>What I Do</label>
                  <textarea
                    value={config.whatIDo}
                    onChange={(e) => setConfig({ ...config, whatIDo: e.target.value })}
                    rows="3"
                    placeholder="你都做些什么咧..."
                  />
                </div>

                <div className="form-group">
                  <label>Why I Code</label>
                  <textarea
                    value={config.whyICode}
                    onChange={(e) => setConfig({ ...config, whyICode: e.target.value })}
                    rows="3"
                    placeholder="为什么写代码咧..."
                  />
                </div>
              </div>

              <div className="settings-section">
                <h2>🛠️ 技术栈</h2>
                <div className="form-group">
                  <label>技术栈（逗号分隔）</label>
                  <input
                    type="text"
                    value={config.techStack}
                    onChange={(e) => setConfig({ ...config, techStack: e.target.value })}
                    placeholder="React,Node.js,Three.js,MongoDB"
                  />
                  <p className="form-hint">用逗号分隔多个技术，例如：React,Node.js,MongoDB</p>
                </div>
              </div>

              <div className="settings-section">
                <h2>📧 联系方式</h2>
                <div className="form-group">
                  <label>联系文本</label>
                  <input
                    type="text"
                    value={config.contactText}
                    onChange={(e) => setConfig({ ...config, contactText: e.target.value })}
                    placeholder="想聊聊？欢迎来撩~"
                  />
                </div>

                <div className="form-group">
                  <label>网站链接</label>
                  <input
                    type="url"
                    value={config.websiteUrl}
                    onChange={(e) => setConfig({ ...config, websiteUrl: e.target.value })}
                    placeholder="http://www.zze.cc"
                  />
                </div>

                <div className="form-group">
                  <label>GitHub 链接</label>
                  <input
                    type="url"
                    value={config.githubUrl}
                    onChange={(e) => setConfig({ ...config, githubUrl: e.target.value })}
                    placeholder="https://github.com/cshaizhihao"
                  />
                </div>
              </div>
            </>
          )}

          <button
            className="btn-save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? '保存中...' : '💾 保存所有设置'}
          </button>
        </div>
      </div>

      {/* 英雄图选择模态框 */}
      {showHeroModal && (
        <div className="modal-overlay" onClick={() => setShowHeroModal(false)}>
          <div className="modal hero-modal" onClick={(e) => e.stopPropagation()}>
            <h2>选择英雄图</h2>
            <div className="hero-grid">
              {heroImages.length === 0 ? (
                <p className="empty-hint">
                  还没有英雄图咧！<br />
                  去图库上传一些 hero 分类的图片吧
                </p>
              ) : (
                heroImages.map((image) => (
                  <div
                    key={image._id}
                    className="hero-option"
                    onClick={() => handleHeroSelect(image.url)}
                  >
                    <img src={getImageUrl(image.url)} alt={image.title} />
                    <p>{image.title}</p>
                  </div>
                ))
              )}
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowHeroModal(false)}
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
