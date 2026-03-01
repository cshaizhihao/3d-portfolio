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
    homeDesktopTip: '拖动旋转 | 滚轮缩放 | 悬停交互',
    homeMobileTip: '单指旋转 | 双指缩放',
    homeStat1Value: '3+',
    homeStat1Label: 'PROJECTS',
    homeStat2Value: '∞',
    homeStat2Label: 'CREATIVITY',
    homeStat3Value: '100%',
    homeStat3Label: 'PASSION',
    // 导航配置
    navLogoTitle: 'ZAKI.DEV',
    navLogoSubtitle: 'CYBERPUNK PORTFOLIO',
    navHomeLabel: 'HOME',
    navProjectsLabel: 'PROJECTS',
    navAboutLabel: 'ABOUT',
    navAdminLabel: 'ADMIN',
    navGalleryLabel: 'GALLERY',
    navSettingsLabel: 'SETTINGS',
    navLoginLabel: 'LOGIN',
    navLogoutLabel: 'LOGOUT',
    // SEO 配置
    seoHomeTitle: 'ZAKI.DEV - 首页',
    seoHomeDescription: '赛博朋克时代的网络数字游民',
    seoAboutTitle: 'ABOUT ME',
    seoAboutDescription: '关于 Zaki 的介绍与技术栈',
    seoProjectsTitle: '项目展示',
    seoProjectsDescription: '项目案例与结果展示',
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
        homeDesktopTip: publicConfig.homeDesktopTip || '拖动旋转 | 滚轮缩放 | 悬停交互',
        homeMobileTip: publicConfig.homeMobileTip || '单指旋转 | 双指缩放',
        homeStat1Value: publicConfig.homeStat1Value || '3+',
        homeStat1Label: publicConfig.homeStat1Label || 'PROJECTS',
        homeStat2Value: publicConfig.homeStat2Value || '∞',
        homeStat2Label: publicConfig.homeStat2Label || 'CREATIVITY',
        homeStat3Value: publicConfig.homeStat3Value || '100%',
        homeStat3Label: publicConfig.homeStat3Label || 'PASSION',
        navLogoTitle: publicConfig.navLogoTitle || 'ZAKI.DEV',
        navLogoSubtitle: publicConfig.navLogoSubtitle || 'CYBERPUNK PORTFOLIO',
        navHomeLabel: publicConfig.navHomeLabel || 'HOME',
        navProjectsLabel: publicConfig.navProjectsLabel || 'PROJECTS',
        navAboutLabel: publicConfig.navAboutLabel || 'ABOUT',
        navAdminLabel: publicConfig.navAdminLabel || 'ADMIN',
        navGalleryLabel: publicConfig.navGalleryLabel || 'GALLERY',
        navSettingsLabel: publicConfig.navSettingsLabel || 'SETTINGS',
        navLoginLabel: publicConfig.navLoginLabel || 'LOGIN',
        navLogoutLabel: publicConfig.navLogoutLabel || 'LOGOUT',
        seoHomeTitle: publicConfig.seoHomeTitle || 'ZAKI.DEV - 首页',
        seoHomeDescription: publicConfig.seoHomeDescription || '赛博朋克时代的网络数字游民',
        seoAboutTitle: publicConfig.seoAboutTitle || 'ABOUT ME',
        seoAboutDescription: publicConfig.seoAboutDescription || '关于 Zaki 的介绍与技术栈',
        seoProjectsTitle: publicConfig.seoProjectsTitle || '项目展示',
        seoProjectsDescription: publicConfig.seoProjectsDescription || '项目案例与结果展示',
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
        { key: 'homeDesktopTip', value: config.homeDesktopTip, description: '首页桌面提示', category: 'general' },
        { key: 'homeMobileTip', value: config.homeMobileTip, description: '首页移动端提示', category: 'general' },
        { key: 'homeStat1Value', value: config.homeStat1Value, description: '首页统计1数值', category: 'general' },
        { key: 'homeStat1Label', value: config.homeStat1Label, description: '首页统计1标签', category: 'general' },
        { key: 'homeStat2Value', value: config.homeStat2Value, description: '首页统计2数值', category: 'general' },
        { key: 'homeStat2Label', value: config.homeStat2Label, description: '首页统计2标签', category: 'general' },
        { key: 'homeStat3Value', value: config.homeStat3Value, description: '首页统计3数值', category: 'general' },
        { key: 'homeStat3Label', value: config.homeStat3Label, description: '首页统计3标签', category: 'general' },
        { key: 'navLogoTitle', value: config.navLogoTitle, description: '导航Logo标题', category: 'theme' },
        { key: 'navLogoSubtitle', value: config.navLogoSubtitle, description: '导航Logo副标题', category: 'theme' },
        { key: 'navHomeLabel', value: config.navHomeLabel, description: '导航-首页', category: 'theme' },
        { key: 'navProjectsLabel', value: config.navProjectsLabel, description: '导航-项目', category: 'theme' },
        { key: 'navAboutLabel', value: config.navAboutLabel, description: '导航-关于', category: 'theme' },
        { key: 'navAdminLabel', value: config.navAdminLabel, description: '导航-后台', category: 'theme' },
        { key: 'navGalleryLabel', value: config.navGalleryLabel, description: '导航-图库', category: 'theme' },
        { key: 'navSettingsLabel', value: config.navSettingsLabel, description: '导航-设置', category: 'theme' },
        { key: 'navLoginLabel', value: config.navLoginLabel, description: '导航-登录', category: 'theme' },
        { key: 'navLogoutLabel', value: config.navLogoutLabel, description: '导航-登出', category: 'theme' },
        { key: 'seoHomeTitle', value: config.seoHomeTitle, description: 'SEO-首页标题', category: 'seo' },
        { key: 'seoHomeDescription', value: config.seoHomeDescription, description: 'SEO-首页描述', category: 'seo' },
        { key: 'seoAboutTitle', value: config.seoAboutTitle, description: 'SEO-About标题', category: 'seo' },
        { key: 'seoAboutDescription', value: config.seoAboutDescription, description: 'SEO-About描述', category: 'seo' },
        { key: 'seoProjectsTitle', value: config.seoProjectsTitle, description: 'SEO-项目标题', category: 'seo' },
        { key: 'seoProjectsDescription', value: config.seoProjectsDescription, description: 'SEO-项目描述', category: 'seo' },
        { key: 'aboutTitle', value: config.aboutTitle, description: 'About 标题', category: 'general' },
        { key: 'aboutSubtitle', value: config.aboutSubtitle, description: 'About 副标题', category: 'general' },
        { key: 'whoAmI', value: config.whoAmI, description: 'Who Am I', category: 'general' },
        { key: 'whatIDo', value: config.whatIDo, description: 'What I Do', category: 'general' },
        { key: 'whyICode', value: config.whyICode, description: 'Why I Code', category: 'general' },
        { key: 'techStack', value: config.techStack, description: '技术栈', category: 'general' },
        { key: 'contactText', value: config.contactText, description: '联系文本', category: 'general' },
        { key: 'websiteUrl', value: config.websiteUrl, description: '网站链接', category: 'social' },
        { key: 'githubUrl', value: config.githubUrl, description: 'GitHub 链接', category: 'social' },
      ].map((item) => ({ ...item, isPublic: true }));

      await configAPI.setConfigsBulk(configs);

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
          <button
            className={`tab-btn ${activeTab === 'nav' ? 'active' : ''}`}
            onClick={() => setActiveTab('nav')}
          >
            🧭 导航与顶部
          </button>
          <button
            className={`tab-btn ${activeTab === 'seo' ? 'active' : ''}`}
            onClick={() => setActiveTab('seo')}
          >
            🔎 SEO 设置
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

                <div className="form-group">
                  <label>桌面交互提示</label>
                  <input
                    type="text"
                    value={config.homeDesktopTip}
                    onChange={(e) => setConfig({ ...config, homeDesktopTip: e.target.value })}
                    placeholder="拖动旋转 | 滚轮缩放 | 悬停交互"
                  />
                </div>

                <div className="form-group">
                  <label>移动端交互提示</label>
                  <input
                    type="text"
                    value={config.homeMobileTip}
                    onChange={(e) => setConfig({ ...config, homeMobileTip: e.target.value })}
                    placeholder="单指旋转 | 双指缩放"
                  />
                </div>

                <div className="form-group">
                  <label>首页统计项 1（数值 / 标签）</label>
                  <div className="inline-grid">
                    <input
                      type="text"
                      value={config.homeStat1Value}
                      onChange={(e) => setConfig({ ...config, homeStat1Value: e.target.value })}
                      placeholder="3+"
                    />
                    <input
                      type="text"
                      value={config.homeStat1Label}
                      onChange={(e) => setConfig({ ...config, homeStat1Label: e.target.value })}
                      placeholder="PROJECTS"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>首页统计项 2（数值 / 标签）</label>
                  <div className="inline-grid">
                    <input
                      type="text"
                      value={config.homeStat2Value}
                      onChange={(e) => setConfig({ ...config, homeStat2Value: e.target.value })}
                      placeholder="∞"
                    />
                    <input
                      type="text"
                      value={config.homeStat2Label}
                      onChange={(e) => setConfig({ ...config, homeStat2Label: e.target.value })}
                      placeholder="CREATIVITY"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>首页统计项 3（数值 / 标签）</label>
                  <div className="inline-grid">
                    <input
                      type="text"
                      value={config.homeStat3Value}
                      onChange={(e) => setConfig({ ...config, homeStat3Value: e.target.value })}
                      placeholder="100%"
                    />
                    <input
                      type="text"
                      value={config.homeStat3Label}
                      onChange={(e) => setConfig({ ...config, homeStat3Label: e.target.value })}
                      placeholder="PASSION"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 导航与顶部设置 */}
          {activeTab === 'nav' && (
            <>
              <div className="settings-section">
                <h2>🧭 左上角 Logo</h2>
                <div className="form-group">
                  <label>Logo 主标题</label>
                  <input
                    type="text"
                    value={config.navLogoTitle}
                    onChange={(e) => setConfig({ ...config, navLogoTitle: e.target.value })}
                    placeholder="ZAKI.DEV"
                  />
                </div>
                <div className="form-group">
                  <label>Logo 副标题</label>
                  <input
                    type="text"
                    value={config.navLogoSubtitle}
                    onChange={(e) => setConfig({ ...config, navLogoSubtitle: e.target.value })}
                    placeholder="CYBERPUNK PORTFOLIO"
                  />
                </div>
              </div>

              <div className="settings-section">
                <h2>🔝 顶部导航文案</h2>
                <div className="inline-grid form-group">
                  <input type="text" value={config.navHomeLabel} onChange={(e) => setConfig({ ...config, navHomeLabel: e.target.value })} placeholder="HOME" />
                  <input type="text" value={config.navProjectsLabel} onChange={(e) => setConfig({ ...config, navProjectsLabel: e.target.value })} placeholder="PROJECTS" />
                  <input type="text" value={config.navAboutLabel} onChange={(e) => setConfig({ ...config, navAboutLabel: e.target.value })} placeholder="ABOUT" />
                  <input type="text" value={config.navAdminLabel} onChange={(e) => setConfig({ ...config, navAdminLabel: e.target.value })} placeholder="ADMIN" />
                  <input type="text" value={config.navGalleryLabel} onChange={(e) => setConfig({ ...config, navGalleryLabel: e.target.value })} placeholder="GALLERY" />
                  <input type="text" value={config.navSettingsLabel} onChange={(e) => setConfig({ ...config, navSettingsLabel: e.target.value })} placeholder="SETTINGS" />
                  <input type="text" value={config.navLoginLabel} onChange={(e) => setConfig({ ...config, navLoginLabel: e.target.value })} placeholder="LOGIN" />
                  <input type="text" value={config.navLogoutLabel} onChange={(e) => setConfig({ ...config, navLogoutLabel: e.target.value })} placeholder="LOGOUT" />
                </div>
              </div>
            </>
          )}

          {/* SEO 设置 */}
          {activeTab === 'seo' && (
            <>
              <div className="settings-section">
                <h2>🔎 SEO 文案</h2>
                <div className="form-group">
                  <label>首页 Title</label>
                  <input type="text" value={config.seoHomeTitle} onChange={(e) => setConfig({ ...config, seoHomeTitle: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>首页 Description</label>
                  <textarea rows="2" value={config.seoHomeDescription} onChange={(e) => setConfig({ ...config, seoHomeDescription: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>About Title</label>
                  <input type="text" value={config.seoAboutTitle} onChange={(e) => setConfig({ ...config, seoAboutTitle: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>About Description</label>
                  <textarea rows="2" value={config.seoAboutDescription} onChange={(e) => setConfig({ ...config, seoAboutDescription: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Projects Title</label>
                  <input type="text" value={config.seoProjectsTitle} onChange={(e) => setConfig({ ...config, seoProjectsTitle: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Projects Description</label>
                  <textarea rows="2" value={config.seoProjectsDescription} onChange={(e) => setConfig({ ...config, seoProjectsDescription: e.target.value })} />
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
