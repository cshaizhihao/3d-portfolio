import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI, imageAPI } from '../api';
import toast from 'react-hot-toast';
import './Profile.css';

function Profile() {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarImages, setAvatarImages] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    avatar: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const fetchAvatarImages = async () => {
    try {
      const response = await imageAPI.getImagesByCategory('avatar');
      setAvatarImages(response.data);
    } catch (error) {
      toast.error('加载头像失败咧');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      toast.success('资料更新成功咧！');
    } catch (error) {
      toast.error(error.message || '更新失败咧');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSelect = (imageUrl) => {
    setFormData({ ...formData, avatar: imageUrl });
    setShowAvatarModal(false);
    toast.success('头像已选择咧！记得保存哦');
  };

  const getAvatarUrl = (avatar) => {
    if (!avatar) return null;
    if (avatar.startsWith('http')) return avatar;
    // 确保使用完整的服务器地址
    const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://141.98.197.210:5000';
    return `${baseUrl}${avatar}`;
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1 className="profile-title glitch" data-text="个人资料">
          个人资料
        </h1>

        <div className="profile-content">
          <div className="avatar-section">
            <div className="avatar-preview">
              {formData.avatar ? (
                <img src={getAvatarUrl(formData.avatar)} alt="Avatar" />
              ) : (
                <div className="avatar-placeholder">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <button
              type="button"
              className="btn-change-avatar"
              onClick={() => {
                fetchAvatarImages();
                setShowAvatarModal(true);
              }}
            >
              📸 更换头像
            </button>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>用户名</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>邮箱</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>个人简介</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows="4"
                placeholder="介绍一下你自己咧..."
              />
            </div>

            <div className="form-group">
              <label>角色</label>
              <input type="text" value={user?.role || 'user'} disabled />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? '保存中...' : '💾 保存资料'}
            </button>
          </form>
        </div>
      </div>

      {/* 头像选择模态框 */}
      {showAvatarModal && (
        <div className="modal-overlay" onClick={() => setShowAvatarModal(false)}>
          <div className="modal avatar-modal" onClick={(e) => e.stopPropagation()}>
            <h2>选择头像</h2>
            <div className="avatar-grid">
              {avatarImages.length === 0 ? (
                <p className="empty-hint">
                  还没有头像图片咧！<br />
                  去图库上传一些 avatar 分类的图片吧
                </p>
              ) : (
                avatarImages.map((image) => (
                  <div
                    key={image._id}
                    className="avatar-option"
                    onClick={() => handleAvatarSelect(image.url)}
                  >
                    <img src={getAvatarUrl(image.url)} alt={image.title} />
                  </div>
                ))
              )}
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowAvatarModal(false)}
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
