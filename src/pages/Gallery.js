import React, { useState, useEffect } from 'react';
import { imageAPI } from '../api';
import toast from 'react-hot-toast';
import './Gallery.css';

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingImage, setEditingImage] = useState(null);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: 'gallery',
    tags: '',
  });
  const [urlData, setUrlData] = useState({
    url: '',
    title: '',
    description: '',
    category: 'gallery',
    tags: '',
  });

  const categories = [
    { value: 'all', label: '全部' },
    { value: 'hero', label: '英雄图' },
    { value: 'project', label: '项目图' },
    { value: 'gallery', label: '图库' },
    { value: 'avatar', label: '头像' },
    { value: 'other', label: '其他' },
  ];

  useEffect(() => {
    fetchImages();
  }, [selectedCategory]);

  const fetchImages = async () => {
    try {
      const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
      const response = await imageAPI.getImages(params);
      setImages(response.data);
    } catch (error) {
      toast.error('加载图片失败咧');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      if (!uploadData.title) {
        setUploadData({ ...uploadData, title: file.name });
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error('请选择图片咧');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('title', uploadData.title);
      formData.append('description', uploadData.description);
      formData.append('category', uploadData.category);
      formData.append('tags', uploadData.tags);

      await imageAPI.uploadImage(formData);
      toast.success('图片上传成功咧！');
      setShowUploadModal(false);
      resetUploadForm();
      fetchImages();
    } catch (error) {
      toast.error(error.message || '上传失败咧');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这张图片吗？')) return;

    try {
      await imageAPI.deleteImage(id);
      toast.success('删除成功咧！');
      fetchImages();
    } catch (error) {
      toast.error('删除失败咧');
    }
  };

  const handleEdit = (image) => {
    setEditingImage({
      id: image._id,
      title: image.title,
      description: image.description || '',
      category: image.category,
      tags: image.tags ? image.tags.join(', ') : '',
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      await imageAPI.updateImage(editingImage.id, {
        title: editingImage.title,
        description: editingImage.description,
        category: editingImage.category,
        tags: editingImage.tags,
      });
      toast.success('更新成功咧！');
      setShowEditModal(false);
      setEditingImage(null);
      fetchImages();
    } catch (error) {
      toast.error('更新失败咧');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlUpload = async (e) => {
    e.preventDefault();
    if (!urlData.url) {
      toast.error('请输入图片链接咧');
      return;
    }

    setUploading(true);
    try {
      await imageAPI.uploadImageFromUrl(urlData);
      toast.success('图片添加成功咧！');
      setShowUrlModal(false);
      resetUrlForm();
      fetchImages();
    } catch (error) {
      toast.error(error.message || '添加失败咧');
    } finally {
      setUploading(false);
    }
  };

  const resetUrlForm = () => {
    setUrlData({
      url: '',
      title: '',
      description: '',
      category: 'gallery',
      tags: '',
    });
  };

  const resetUploadForm = () => {
    setUploadData({
      title: '',
      description: '',
      category: 'gallery',
      tags: '',
    });
    setSelectedImage(null);
  };

  const getImageUrl = (image) => {
    const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://141.98.197.210:5000';
    return `${baseUrl}${image.url}`;
  };

  const getThumbnailUrl = (image) => {
    const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://141.98.197.210:5000';
    return image.thumbnail 
      ? `${baseUrl}${image.thumbnail}`
      : getImageUrl(image);
  };

  if (loading) {
    return (
      <div className="gallery-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <div className="gallery-container">
        <div className="gallery-header">
          <h1 className="gallery-title glitch" data-text="图库管理">
            图库管理
          </h1>
          <div className="header-actions">
            <button className="btn-primary" onClick={() => setShowUploadModal(true)}>
              📸 上传图片
            </button>
            <button className="btn-secondary" onClick={() => setShowUrlModal(true)}>
              🔗 添加链接
            </button>
          </div>
        </div>

        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {images.length === 0 ? (
          <div className="empty-state">
            <p>还没有图片咧，快去上传一张吧！</p>
          </div>
        ) : (
          <div className="images-grid">
            {images.map((image) => (
              <div key={image._id} className="image-card">
                <div className="image-preview">
                  <img src={getThumbnailUrl(image)} alt={image.title} />
                  <div className="image-overlay">
                    <button
                      className="btn-view"
                      onClick={() => window.open(getImageUrl(image), '_blank')}
                    >
                      👁️ 查看
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(image)}
                    >
                      ✏️ 编辑
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(image._id)}
                    >
                      🗑️ 删除
                    </button>
                  </div>
                </div>
                <div className="image-info">
                  <h3>{image.title}</h3>
                  <p className="image-category">{categories.find(c => c.value === image.category)?.label}</p>
                  <div className="image-stats">
                    <span>👁️ {image.views}</span>
                    <span>📏 {image.width}x{image.height}</span>
                  </div>
                  {image.tags && image.tags.length > 0 && (
                    <div className="image-tags">
                      {image.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 上传模态框 */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>📸 上传图片</h2>
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label>选择图片</label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFileChange}
                  required
                />
                {selectedImage && (
                  <p className="file-info">已选择: {selectedImage.name}</p>
                )}
              </div>

              <div className="form-group">
                <label>标题</label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>描述</label>
                <textarea
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>分类</label>
                  <select
                    value={uploadData.category}
                    onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                  >
                    {categories.filter(c => c.value !== 'all').map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>标签（逗号分隔）</label>
                  <input
                    type="text"
                    value={uploadData.tags}
                    onChange={(e) => setUploadData({ ...uploadData, tags: e.target.value })}
                    placeholder="风景, 人物, 建筑"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowUploadModal(false)}
                >
                  取消
                </button>
                <button type="submit" className="btn-primary" disabled={uploading}>
                  {uploading ? '上传中...' : '上传'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 编辑模态框 */}
      {showEditModal && editingImage && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>✏️ 编辑图片</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>标题</label>
                <input
                  type="text"
                  value={editingImage.title}
                  onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>描述</label>
                <textarea
                  value={editingImage.description}
                  onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>分类</label>
                  <select
                    value={editingImage.category}
                    onChange={(e) => setEditingImage({ ...editingImage, category: e.target.value })}
                  >
                    {categories.filter(c => c.value !== 'all').map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>标签（逗号分隔）</label>
                  <input
                    type="text"
                    value={editingImage.tags}
                    onChange={(e) => setEditingImage({ ...editingImage, tags: e.target.value })}
                    placeholder="风景, 人物, 建筑"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  取消
                </button>
                <button type="submit" className="btn-primary" disabled={uploading}>
                  {uploading ? '保存中...' : '保存'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* URL 上传模态框 */}
      {showUrlModal && (
        <div className="modal-overlay" onClick={() => setShowUrlModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>🔗 添加网络图片</h2>
            <form onSubmit={handleUrlUpload}>
              <div className="form-group">
                <label>图片链接</label>
                <input
                  type="url"
                  value={urlData.url}
                  onChange={(e) => setUrlData({ ...urlData, url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="form-group">
                <label>标题</label>
                <input
                  type="text"
                  value={urlData.title}
                  onChange={(e) => setUrlData({ ...urlData, title: e.target.value })}
                  placeholder="不填则使用文件名"
                />
              </div>

              <div className="form-group">
                <label>描述</label>
                <textarea
                  value={urlData.description}
                  onChange={(e) => setUrlData({ ...urlData, description: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>分类</label>
                  <select
                    value={urlData.category}
                    onChange={(e) => setUrlData({ ...urlData, category: e.target.value })}
                  >
                    {categories.filter(c => c.value !== 'all').map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>标签（逗号分隔）</label>
                  <input
                    type="text"
                    value={urlData.tags}
                    onChange={(e) => setUrlData({ ...urlData, tags: e.target.value })}
                    placeholder="风景, 人物, 建筑"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowUrlModal(false)}
                >
                  取消
                </button>
                <button type="submit" className="btn-primary" disabled={uploading}>
                  {uploading ? '添加中...' : '添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
