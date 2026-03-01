import React, { useState, useEffect } from 'react';
import { configAPI, imageAPI } from '../api';
import toast from 'react-hot-toast';
import './Settings.css';

function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [heroImages, setHeroImages] = useState([]);
  const [config, setConfig] = useState({
    heroImage: '',
    siteTitle: 'ZAKI.DEV',
    siteDescription: '赛博朋克时代的网络数字游民',
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await configAPI.getPublicConfigs();
      setConfig({
        heroImage: response.heroImage || '',
        siteTitle: response.siteTitle || 'ZAKI.DEV',
        siteDescription: response.siteDescription || '赛博朋克时代的网络数字游民',
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
      // 保存英雄图
      await configAPI.setConfig({
        key: 'heroImage',
        value: config.heroImage,
        description: '首页英雄图',
        category: 'theme',
        isPublic: true,
      });

      // 保存网站标题
      await configAPI.setConfig({
        key: 'siteTitle',
        value: config.siteTitle,
        description: '网站标题',
        category: 'general',
        isPublic: true,
      });

      // 保存网站描述
      await configAPI.setConfig({
        key: 'siteDescription',
        value: config.siteDescription,
        description: '网站描述',
        category: 'general',
        isPublic: true,
      });

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

        <div className="settings-content">
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
            <h2>📝 网站信息</h2>
            <div className="form-group">
              <label>网站标题</label>
              <input
                type="text"
                value={config.siteTitle}
                onChange={(e) => setConfig({ ...config, siteTitle: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>网站描述</label>
              <textarea
                value={config.siteDescription}
                onChange={(e) => setConfig({ ...config, siteDescription: e.target.value })}
                rows="3"
              />
            </div>
          </div>

          <button
            className="btn-save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? '保存中...' : '💾 保存设置'}
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
